'use client'

import { useState } from 'react'
import { useUser, useClerk, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const DEMO_USER_ID = 'user_3JKeCH7cF5QI8qh1G4TDXkIv5Ne'

function AccountMenu() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const isDemoUser = user?.id === DEMO_USER_ID

  function handleSignOut() {
    setIsPending(true)
    signOut(() => {
      router.push('/')
      router.refresh()
    })
  }

  if (isDemoUser) {
    return (
      <Button type='button' onClick={handleSignOut} disabled={isPending}>
        {isPending ? 'Signing out...' : 'Sign Out (Demo)'}
      </Button>
    )
  }

  return <UserButton afterSignOutUrl='/' />
}

export default AccountMenu
