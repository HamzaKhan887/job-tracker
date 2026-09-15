import LinksDropdown from './LinksDropdown'
import ThemeToggle from './ThemeToggle'
import AccountMenu from '@/components/AccountMenu'

function Navbar() {
  return (
    <nav className='border-b border-border py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between'>
      <div>
        <LinksDropdown />
      </div>
      <div className='flex items-center gap-x-4'>
        <ThemeToggle />
        <AccountMenu />
      </div>
    </nav>
  )
}

export default Navbar
