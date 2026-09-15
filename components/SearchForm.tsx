'use client'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { JobStatus, JobMode, JobArrangement } from '@/utils/types'

function SearchForm() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const jobStatus = searchParams.get('jobStatus') || 'all'
  const location = searchParams.get('location') || ''
  const mode = searchParams.get('mode') || 'all'
  const arrangement = searchParams.get('arrangement') || 'all'

  const router = useRouter()
  const pathname = usePathname()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get('search') as string
    const jobStatus = formData.get('jobStatus') as string
    const location = formData.get('location') as string
    const mode = formData.get('mode') as string
    const arrangement = formData.get('arrangement') as string

    let params = new URLSearchParams()
    params.set('search', search)
    params.set('jobStatus', jobStatus)
    params.set('location', location)
    params.set('mode', mode)
    params.set('arrangement', arrangement)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <form
      className='bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg'
      onSubmit={handleSubmit}
    >
      <div className='space-y-2'>
        <Label htmlFor='search'>Position / Company</Label>
        <Input
          id='search'
          type='text'
          placeholder='Search Position / Company'
          name='search'
          defaultValue={search}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='jobStatus'>Status</Label>
        <Select name='jobStatus' defaultValue={jobStatus}>
          <SelectTrigger id='jobStatus'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {['all', ...Object.values(JobStatus)].map((jobStatus) => (
              <SelectItem key={jobStatus} value={jobStatus}>
                {jobStatus}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='location'>Location</Label>
        <Input
          id='location'
          type='text'
          placeholder='Search Location'
          name='location'
          defaultValue={location}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='mode'>Job Type</Label>
        <Select name='mode' defaultValue={mode}>
          <SelectTrigger id='mode'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {['all', ...Object.values(JobMode)].map((mode) => (
              <SelectItem key={mode} value={mode}>
                {mode}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='arrangement'>Work Arrangement</Label>
        <Select name='arrangement' defaultValue={arrangement}>
          <SelectTrigger id='arrangement'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {['all', ...Object.values(JobArrangement)].map((arrangement) => (
              <SelectItem key={arrangement} value={arrangement}>
                {arrangement}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex items-end'>
        <Button type='submit' className='w-full'>
          Search
        </Button>
      </div>
    </form>
  )
}

export default SearchForm
