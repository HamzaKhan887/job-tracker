'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type PageButtonContainerProps = {
  currentPage: number
  totalPages: number
}

type PageButtonProps = {
  page: number
  activeClass: boolean
}

import { Button } from './ui/button'
function PageButtonContainer({
  currentPage,
  totalPages,
}: PageButtonContainerProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get('search') || '',
      jobStatus: searchParams.get('jobStatus') || '',
      location: searchParams.get('location') || '',
      mode: searchParams.get('mode') || '',
      arrangement: searchParams.get('arrangement') || '',
      page: String(page),
    }

    let params = new URLSearchParams(defaultParams)
    router.push(`${pathname}?${params.toString()}`)
  }

  const addPageButton = ({ page, activeClass }: PageButtonProps) => {
    return (
      <Button
        key={page}
        size='icon'
        variant={activeClass ? 'default' : 'outline'}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Button>
    )
  }

  const renderPageButtons = () => {
    const pageButtons = []
    // first page
    pageButtons.push(addPageButton({ page: 1, activeClass: currentPage === 1 }))

    // dots
    if (currentPage > 3) {
      pageButtons.push(
        <Button size='icon' variant='outline' key='dots-left'>
          ...
        </Button>
      )
    }
    // one before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          page: currentPage - 1,
          activeClass: false,
        })
      )
    }
    // current page
    // condition is to prevent duplicates
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(
        addPageButton({
          page: currentPage,
          activeClass: true,
        })
      )
    }

    // one after current page
    if (currentPage !== totalPages && currentPage !== totalPages - 1) {
      pageButtons.push(
        addPageButton({
          page: currentPage + 1,
          activeClass: false,
        })
      )
    }
    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <Button size='icon' variant='outline' key='dots-right'>
          ...
        </Button>
      )
    }
    pageButtons.push(
      addPageButton({
        page: totalPages,
        activeClass: currentPage === totalPages,
      })
    )
    return pageButtons
  }

  return (
    <div className='flex flex-wrap gap-x-2 gap-y-2 items-center'>
      {/* prev */}
      <Button
        className='flex items-center gap-x-2'
        variant='outline'
        onClick={() => {
          let prevPage = currentPage - 1
          if (prevPage < 1) prevPage = totalPages
          handlePageChange(prevPage)
        }}
      >
        <ChevronLeft />
        <span className='hidden sm:inline'>prev</span>
      </Button>

      {renderPageButtons()}

      {/* next */}
      <Button
        className='flex items-center gap-x-2'
        onClick={() => {
          let nextPage = currentPage + 1
          if (nextPage > totalPages) nextPage = 1
          handlePageChange(nextPage)
        }}
        variant='outline'
      >
        <span className='hidden sm:inline'>next</span>
        <ChevronRight />
      </Button>
    </div>
  )
}
export default PageButtonContainer
