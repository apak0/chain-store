'use client'

import { login } from '@/app/lib/services'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

export default function Login() {
  const router = useRouter()
  const authenticate = async (state: any, formData: FormData) => {
    const object: any = {}
    formData.forEach((value, key) => {
      object[key] = value
    })
    const result = login(object)
      .then((res) => {
        router.push('/home')
      })
      .catch(console.error)

    return result
  }
  const [errorMessage, dispatch] = useActionState(authenticate, undefined)

  return (
    <form action={dispatch}>
      <h1 className="mb-8">Login</h1>

      <div className="flex flex-col gap-4">
        <input type="email" name="email" id="email" placeholder="Email" required autoComplete="email" />
        <input type="password" name="password" id="password" placeholder="Password" required autoComplete="password" />
      </div>
      <div className="grid gap-4 mt-8">
        <LoginButton />
        <Link href="/auth/register" className="link ml-auto">
          to register
        </Link>
      </div>
    </form>
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
