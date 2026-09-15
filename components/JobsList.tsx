'use client'
import JobCard from './JobCard'
import { useSearchParams } from 'next/navigation'
import { getAllJobsAction } from '@/utils/actions'
import { useQuery } from '@tanstack/react-query'
import PageButtonContainer from '@/components/PageButtonContainer'

function JobsList() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const jobStatus = searchParams.get('jobStatus') || 'all'
  const location = searchParams.get('location') || ''
  const mode = searchParams.get('mode') || 'all'
  const arrangement = searchParams.get('arrangement') || 'all'
  const pageNumber = Number(searchParams.get('page') || 1)

  const { data, isPending } = useQuery({
    queryKey: [
      'jobs',
      search,
      jobStatus,
      location,
      mode,
      arrangement,
      pageNumber,
    ],
    queryFn: () =>
      getAllJobsAction({
        search,
        jobStatus,
        location,
        mode,
        arrangement,
        page: pageNumber,
      }),
  })

  const jobs = data?.jobs || []

  const count = data?.count || 0
  const page = data?.page || 0
  const totalPages = data?.totalPages || 0

  if (isPending) return <h2 className='text-xl'>Please Wait...</h2>

  if (jobs.length < 1) return <h2 className='text-xl'>No Jobs Founds</h2>

  return (
    <>
      <div className='flex flex-wrap items-center justify-between gap-4 mb-8'>
        <h2 className='text-xl font-semibold capitalize'>{count} jobs found</h2>
        {totalPages < 2 ? null : (
          <PageButtonContainer currentPage={page} totalPages={totalPages} />
        )}
      </div>

      <div className='grid md:grid-cols-2 gap-8'>
        {jobs.map((job) => {
          return <JobCard key={job.id} job={job} />
        })}
      </div>
    </>
  )
}

export default JobsList
