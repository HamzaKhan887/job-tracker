'use client'

import { useUser, useClerk, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

const DEMO_USER_ID = 'user_3JKeCH7cF5QI8qh1G4TDXkIv5Ne'

function AccountMenu() {
  const { user } = useUser()
  const { signOut } = useClerk()

  const isDemoUser = user?.id === DEMO_USER_ID

  if (isDemoUser) {
    return (
      <Button
        type='button'
        onClick={() =>
          signOut(() => {
            window.location.href = '/'
          })
        }
      >
        Sign Out (Demo)
      </Button>
    )
  }

  return <UserButton afterSignOutUrl='/' />
}

export default AccountMenu
