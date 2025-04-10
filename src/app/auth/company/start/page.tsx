import Link from 'next/link'

import { PhoneInput } from '@/components/PhoneInput'
import { startCompanyRegister } from '@/lib/actions/auth'

export default function StartAsCompany() {
  const formAction = async (formData: FormData) => {
    'use server'

    const res = await startCompanyRegister(formData)
    console.log('ahoy41', res)
    // TODO: handle response
  }

  return (
    <form action={formAction} className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-16">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="mb-4">Start As Company</h1>
        <p>Partner with us to reach more customers, make more money and grow your business online</p>
        <p>Your success story starts here</p>
      </div>
      <div className="flex flex-col w-80 gap-4">
        <input
          type="text"
          name="organization"
          id="organization"
          placeholder="Company Name"
          required
          autoComplete="organization"
        />
        <input type="text" name="email" id="email" placeholder="Company Email" required autoComplete="email" />
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Owner First Name"
          required
          autoComplete="given-name"
        />
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Owner Last Name"
          required
          autoComplete="family-name"
        />
        <PhoneInput name="tel" placeholder="Company Phone" />
      </div>
      <div className="grid gap-4 mt-8 w-80">
        {/* add privacy-policy checkbox */}
        <div className="flex items-center gap-2">
          <input type="checkbox" name="privacy-policy" id="privacy-policy" required />
          <label htmlFor="privacy-policy">
            I agree to the <Link href="/privacy-policy">privacy policy</Link>
          </label>
        </div>
        <button className="w-full" type="submit">
          Start as Company
        </button>
      </div>
    </form>
  )
}
