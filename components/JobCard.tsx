import { JobType } from '@/utils/types'
import {
  Bookmark,
  Briefcase,
  MapPin,
  CalendarDays,
  Building2,
} from 'lucide-react'

import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import JobInfo from './JobInfo'
import DeleteJobButton from './DeleteJobButton'

function JobCard({ job }: { job: JobType }) {
  const date = new Date(job.createdAt).toLocaleDateString()
  return (
    <Card className='bg-muted'>
      <CardHeader className='pb-4'>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
        <Badge className='w-32 justify-center mt-1.5'>
          <JobInfo icon={<Bookmark className='w-4 h-4' />} text={job.status} />
        </Badge>
      </CardHeader>
      <Separator />
      <CardContent className='mt-4 grid grid-cols-2 gap-4'>
        <JobInfo icon={<Briefcase />} text={job.mode} />
        <JobInfo icon={<MapPin />} text={job.location} />
        <JobInfo icon={<CalendarDays />} text={date} />
        <JobInfo icon={<Building2 />} text={job.arrangement} />
      </CardContent>
      <CardFooter className='flex gap-4'>
        <Button asChild size='sm' className='capitalize'>
          <Link href={`/jobs/${job.id}`}>edit</Link>
        </Button>
        <DeleteJobButton id={job.id} />
      </CardFooter>
    </Card>
  )
}

export default JobCard
