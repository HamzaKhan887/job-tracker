'use client'

import Image from 'next/image'
import Logo from '../assets/logo.svg'
import AllJobs from '../assets/all-jobs.png'
import AddJob from '../assets/add-job.png'
import Stats1 from '../assets/stats-1.png'
import Stats2 from '../assets/stats-2.png'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DemoLoginButton from '@/components/DemoLoginButton'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import ThemeToggle from '@/components/ThemeToggle'
import { useUser } from '@clerk/nextjs'
import AccountMenu from '@/components/AccountMenu'

const screenshots = [
  {
    src: AllJobs,
    alt: 'List of tracked job applications with search and filters',
  },
  {
    src: AddJob,
    alt: 'Add job form with fields for position, company, location, status, job type and work arrangement',
  },
  {
    src: Stats1,
    alt: 'Stats overview with applied, interview, offer, accepted, declined and withdrawn counts, and the monthly applications chart',
  },
  {
    src: Stats2,
    alt: 'Monthly applications chart and pie charts breaking down job type and work arrangement',
  },
]

export default function HomePage() {
  const { isSignedIn } = useUser()
  return (
    <main className='lg:h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-20 lg:overflow-hidden'>
      <header className='w-full mx-auto py-6 flex flex-col gap-4 sm:flex-row sm:gap-0 items-center justify-between'>
        <Image src={Logo} alt='logo' />
        <div className='flex items-center justify-between gap-3'>
          <ThemeToggle />
          {isSignedIn ? (
            <AccountMenu />
          ) : (
            <Button asChild>
              <Link href='/add-job'>Sign In / Register</Link>
            </Button>
          )}
        </div>
      </header>

      <section className='w-full mx-auto mt-8 lg:mt-0 flex-1 grid lg:grid-cols-[0.85fr,1.15fr] items-center'>
        <div className='max-w-xl'>
          <h1 className='capitalize text-4xl md:text-6xl font-bold'>
            job <span className='text-primary'>tracking</span> app
          </h1>
          <p className='leading-loose max-w-lg mt-4'>
            Track and manage all your applications in one place. Log the role,
            company and status as you apply, then search and filter by role,
            company, status, location, job type and arrangement to find exactly
            what you need. A built-in stats page turns all that data into clear
            charts and breakdowns, so you can see exactly how your search is
            progressing at a glance
          </p>
          <div className='flex flex-wrap items-center gap-4 mt-4'>
            <Button asChild>
              <Link href='/add-job'>Get Started</Link>
            </Button>
            <DemoLoginButton />
          </div>
        </div>
        <Carousel
          className='hidden lg:block'
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent>
            {screenshots.map((screenshot) => (
              <CarouselItem key={screenshot.alt}>
                <div className='rounded-xl overflow-hidden border shadow-lg'>
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    className='w-full h-full object-cover'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </main>
  )
}
