'use client'

import { useState } from 'react'
import { useUser, useClerk, useSignIn } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { createDemoSignInToken } from '@/utils/actions'
import { useRouter } from 'next/navigation'

function DemoLoginBtn() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const { isSignedIn } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  async function handleDemoLogin() {
    if (!isLoaded || isPending) return
    setIsPending(true)

    try {
      if (isSignedIn) {
        await signOut()
      }

      const token = await createDemoSignInToken()
      const result = await signIn.create({
        strategy: 'ticket',
        ticket: token,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/add-job')
        router.refresh()
      }
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Button
      type='button'
      onClick={handleDemoLogin}
      variant='secondary'
      disabled={isPending}
    >
      {isPending ? 'Signing in...' : 'Try Demo'}
    </Button>
  )
}

export default DemoLoginBtn
