'use server'

import db from './db'
import { auth } from '@clerk/nextjs'
import { createAndEditJobSchema, CreateAndEditJobType, JobType } from './types'
import { redirect } from 'next/navigation'
import { Prisma } from '@prisma/client'
import { clerkClient } from '@clerk/nextjs/server'
import dayjs from 'dayjs'

function authenticateAndRedirect(): string {
  const { userId } = auth()
  if (!userId) {
    redirect('/')
  }
  return userId
}

export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = authenticateAndRedirect()
  try {
    createAndEditJobSchema.parse(values)
    return await db.job.create({
      data: {
        ...values,
        clerkId: userId,
      },
    })
  } catch (error) {
    console.error(error)
    return null
  }
}

type GetAllJobsActionTypes = {
  search?: string
  jobStatus?: string
  location?: string
  mode?: string
  arrangement?: string
  page?: number
  limit?: number
}

export async function getAllJobsAction({
  search,
  jobStatus,
  location,
  mode,
  arrangement,
  page = 1,
  limit = 10,
}: GetAllJobsActionTypes): Promise<{
  jobs: JobType[]
  count: number
  page: number
  totalPages: number
}> {
  const userId = authenticateAndRedirect()

  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    }

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          { position: { contains: search, mode: 'insensitive' } },
          { company: { contains: search, mode: 'insensitive' } },
        ],
      }
    }

    if (jobStatus && jobStatus !== 'all') {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      }
    }

    if (location) {
      whereClause = {
        ...whereClause,
        location: { contains: location, mode: 'insensitive' },
      }
    }

    if (mode && mode !== 'all') {
      whereClause = {
        ...whereClause,
        mode,
      }
    }

    if (arrangement && arrangement !== 'all') {
      whereClause = {
        ...whereClause,
        arrangement,
      }
    }

    const skip = (page - 1) * limit

    const jobs: JobType[] = await db.job.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })

    const count = await db.job.count({ where: whereClause })
    const totalPages = Math.ceil(count / limit)

    return { jobs, count, page, totalPages }
  } catch (error) {
    console.error(error)
    return { jobs: [], count: 0, page: 1, totalPages: 0 }
  }
}

export async function deleteJobAction(id: string): Promise<JobType | null> {
  const userId = authenticateAndRedirect()

  try {
    return await db.job.delete({
      where: {
        id,
        clerkId: userId,
      },
    })
  } catch (error) {
    return null
  }
}

export async function getSingleJobAction(id: string): Promise<JobType | null> {
  let job: JobType | null = null
  const userId = authenticateAndRedirect()

  try {
    job = await db.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    })
  } catch (error) {
    job = null
  }
  if (!job) {
    redirect('/jobs')
  }
  return job
}

export async function updateJobAction(
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = authenticateAndRedirect()

  try {
    return await db.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    })
  } catch (error) {
    return null
  }
}

export async function getStatsAction(): Promise<{
  applied: number
  interview: number
  offer: number
  accepted: number
  declined: number
  withdrawn: number
}> {
  const userId = authenticateAndRedirect()
  try {
    const stats = await db.job.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
      where: {
        clerkId: userId,
      },
    })
    const statsObject = stats.reduce(
      (acc, curr) => {
        acc[curr.status] = curr._count.status
        return acc
      },
      {} as Record<string, number>
    )

    const defaultStats = {
      applied: 0,
      interview: 0,
      offer: 0,
      accepted: 0,
      declined: 0,
      withdrawn: 0,
      ...statsObject,
    }

    return defaultStats
  } catch (error) {
    redirect('/jobs')
  }
}

export async function getChartsDataAction(): Promise<{
  monthlyApplications: Array<{ date: string; count: number }>
  modeStats: Array<{ name: string; count: number }>
  arrangementStats: Array<{ name: string; count: number }>
}> {
  const userId = authenticateAndRedirect()
  const sixMonthsAgo = dayjs().subtract(6, 'month').toDate()

  try {
    const jobs = await db.job.findMany({
      where: {
        clerkId: userId,
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    const monthlyApplications = jobs.reduce(
      (acc, job) => {
        const date = dayjs(job.createdAt).format('MMM YY')
        const existingEntry = acc.find((entry) => entry.date === date)

        if (existingEntry) {
          existingEntry.count += 1
        } else {
          acc.push({ date, count: 1 })
        }

        return acc
      },
      [] as Array<{ date: string; count: number }>
    )

    const modeGroups = await db.job.groupBy({
      by: ['mode'],
      _count: { mode: true },
      where: { clerkId: userId },
    })

    const arrangementGroups = await db.job.groupBy({
      by: ['arrangement'],
      _count: { arrangement: true },
      where: { clerkId: userId },
    })

    const modeStats = modeGroups.map((g) => ({
      name: g.mode,
      count: g._count.mode,
    }))

    const arrangementStats = arrangementGroups.map((g) => ({
      name: g.arrangement,
      count: g._count.arrangement,
    }))

    return { monthlyApplications, modeStats, arrangementStats }
  } catch (error) {
    redirect('/jobs')
  }
}
export async function createDemoSignInToken() {
  const signInToken = await clerkClient.signInTokens.createSignInToken({
    userId: 'user_3JKeCH7cF5QI8qh1G4TDXkIv5Ne',
    expiresInSeconds: 60,
  })

  return signInToken.token
}
