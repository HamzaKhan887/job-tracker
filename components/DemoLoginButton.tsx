'use client'

import { useUser, useClerk, useSignIn } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { createDemoSignInToken } from '@/utils/actions'

function DemoLoginButton() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const { isSignedIn } = useUser()
  const { signOut } = useClerk()

  async function handleDemoLogin() {
    if (!isLoaded) return

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
      window.location.href = '/add-job'
    }
  }

  return (
    <Button type='button' onClick={handleDemoLogin} variant='secondary'>
      Try Demo
    </Button>
  )
}

export default DemoLoginButton
