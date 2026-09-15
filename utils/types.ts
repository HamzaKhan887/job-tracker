import * as z from 'zod'

export type JobType = {
  id: string
  createdAt: Date
  updatedAt: Date
  clerkId: string
  position: string
  company: string
  location: string
  status: string
  mode: string
  arrangement: string
}

export enum JobStatus {
  Applied = 'applied',
  Interview = 'interview',
  Offer = 'offer',
  Accepted = 'accepted',
  Declined = 'declined',
  Withdrawn = 'withdrawn',
}

export enum JobMode {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Internship = 'internship',
}

export enum JobArrangement {
  Hybrid = 'hybrid',
  OnSite = 'on-site',
  Remote = 'remote',
}

export const createAndEditJobSchema = z.object({
  position: z.string().min(2, {
    message: 'position must be at least 2 characters.',
  }),
  company: z.string().min(2, {
    message: 'company must be at least 2 characters.',
  }),
  location: z.string().min(2, {
    message: 'location must be at least 2 characters.',
  }),
  status: z.nativeEnum(JobStatus),
  mode: z.nativeEnum(JobMode),
  arrangement: z.nativeEnum(JobArrangement),
})

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>
