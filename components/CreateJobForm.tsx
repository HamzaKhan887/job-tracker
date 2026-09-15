'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  JobStatus,
  JobMode,
  JobArrangement,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from '@/utils/types'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { CustomFormField, CustomFormSelect } from './FormComponents'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createJobAction } from '@/utils/actions'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

function CreateJobForm() {
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      status: JobStatus.Applied,
      mode: JobMode.FullTime,
      arrangement: JobArrangement.Hybrid,
    },
  })

  const queryClient = useQueryClient()
  const { toast } = useToast()
  const router = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          variant: 'destructive',
          description: 'There was an error creating the job',
        })
        return
      }
      toast({ description: 'Job Created Successfully' })
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      queryClient.invalidateQueries({ queryKey: ['charts'] })
      router.push('/jobs')
    },
  })

  function onSubmit(values: CreateAndEditJobType) {
    mutate(values)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-muted p-8 rounded'
      >
        <h2 className='capitalize font-semibold text-4xl mb-6'>add job</h2>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start'>
          {/* position */}
          <CustomFormField name='position' control={form.control} />
          {/* company */}
          <CustomFormField name='company' control={form.control} />
          {/* location */}
          <CustomFormField name='location' control={form.control} />
          {/* job status */}
          <CustomFormSelect
            name='status'
            control={form.control}
            items={Object.values(JobStatus)}
            labelText='job status'
          />
          {/* job mode */}
          <CustomFormSelect
            name='mode'
            control={form.control}
            items={Object.values(JobMode)}
            labelText='job mode'
          />
          {/* job work arrangement */}
          <CustomFormSelect
            name='arrangement'
            control={form.control}
            items={Object.values(JobArrangement)}
            labelText='job arrangement'
          />
        </div>
        <Button
          type='submit'
          className='w-full mt-4 capitalize'
          disabled={isPending}
        >
          {isPending ? 'loading' : 'create job'}
        </Button>
      </form>
    </Form>
  )
}

export default CreateJobForm
