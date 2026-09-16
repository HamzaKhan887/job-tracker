'use client'
import { useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
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
  const [isOpen, setIsOpen] = useState(false)

  const hasActiveFilters =
    search ||
    jobStatus !== 'all' ||
    location ||
    mode !== 'all' ||
    arrangement !== 'all'

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

  const handleClear = () => {
    router.push(pathname)
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className='bg-muted mb-16 rounded-lg'
    >
      <CollapsibleTrigger asChild>
        <Button
          type='button'
          variant='ghost'
          className='w-full justify-between p-8 sm:hidden'
        >
          <span className='flex items-center gap-2'>
            <SlidersHorizontal className='w-4 h-4' />
            Search & Filters
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent
        forceMount
        className='data-[state=closed]:hidden data-[state=open]:block sm:!block'
      >
        <form
          key={searchParams.toString()}
          className='grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-8 pt-0 sm:pt-8'
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
                {['all', ...Object.values(JobArrangement)].map(
                  (arrangement) => (
                    <SelectItem key={arrangement} value={arrangement}>
                      {arrangement}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-end gap-2'>
            <Button type='submit' className='w-full'>
              Search
            </Button>
            {hasActiveFilters && (
              <Button type='button' variant='destructive' onClick={handleClear}>
                <X className='w-4 h-4 mr-2' />
                Clear
              </Button>
            )}
          </div>
        </form>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default SearchForm
