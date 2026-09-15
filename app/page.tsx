import Image from 'next/image'
import Logo from '../assets/logo.svg'
import JobsScreenshot from '../assets/all-jobs.png'
import StatsScreenshot from '../assets/stats.png'
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

const screenshots = [
  {
    src: JobsScreenshot,
    alt: 'List of tracked job applications with search and filters',
  },
  {
    src: StatsScreenshot,
    alt: 'Monthly applications chart and pie charts breaking down job type and work arrangement',
  },
]

export default function HomePage() {
  return (
    <main className='lg:h-screen flex flex-col lg:overflow-hidden'>
      <header className='max-w-7xl w-full mx-auto px-4 sm:px-8 py-6'>
        <Image src={Logo} alt='logo' />
      </header>

      <section className='max-w-7xl w-full mx-auto px-4 sm:px-8 mt-8 lg:mt-0 flex-1 grid lg:grid-cols-[1fr,600px] items-center'>
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
            progressing at a glance.
          </p>
          <div className='flex flex-wrap items-center gap-4 mt-4'>
            <Button asChild>
              <Link href='/add-job'>Get Started</Link>
            </Button>
            <DemoLoginButton />
          </div>
        </div>
        <Carousel className='hidden lg:block'>
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
