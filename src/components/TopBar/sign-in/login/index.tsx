'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'

import SignInPage from './SignInGoogle'

import { login } from '@/lib/services'

export default function Login({ setLoginContent }: { setLoginContent: (val: string) => void }) {
  const router = useRouter()
  const authenticate = async (state: any, formData: FormData) => {
    const object: any = {}
    formData.forEach((value, key) => {
      object[key] = value
    })
    const result = login(object)
      .then(() => {
        router.push('/home')
      })
      .catch(console.error)

    return result
  }
  const [, dispatch] = useActionState(authenticate, undefined)

  return (
    <div>
      <form action={dispatch}>
        <h1 className="mb-8 text-center">Login</h1>

        <div className="flex flex-col gap-4">
          <input type="email" name="email" id="email" placeholder="Email" required autoComplete="email" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            autoComplete="password"
          />
        </div>
        <div className="grid gap-4 mt-8">
          <LoginButton />
          <button onClick={() => setLoginContent('register')} className="link ml-auto btn-text" type="button">
            to register
          </button>
        </div>
      </form>
      <SignInPage />
    </div>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault()
    }
  }

  return (
    <button className="w-full" aria-disabled={pending} type="submit" onClick={handleClick}>
      Login
    </button>
  )
}
