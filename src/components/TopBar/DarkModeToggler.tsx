'use client'

import { useEffect, useState } from 'react'

import { DarkModeTogglerContainer } from './styled'

export const DarkModeToggler = () => {
  const [theme, setTheme] = useState(
    globalThis.localStorage?.getItem('theme') ||
      (globalThis.matchMedia && globalThis.matchMedia('(prefers-color-scheme: dark)').matches && 'dark'),
  )

  useEffect(() => {
    try {
      const initialTheme =
        globalThis.localStorage.getItem('theme') ||
        (globalThis.matchMedia && globalThis.matchMedia('(prefers-color-scheme: dark)').matches && 'dark') ||
        'light'
      document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    } catch (e) {
      console.log('Error in localStorage:', e)
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme == 'light' ? 'dark' : 'light'

    try {
      localStorage.setItem('theme', nextTheme)
      document.documentElement.classList.toggle('dark', nextTheme === 'dark')
      setTheme(nextTheme)
    } catch (e) {
      console.log('Error in localStorage:', e)
    }
  }

  return (
    <DarkModeTogglerContainer>
      <input type="checkbox" id="toggle_checkbox" onChange={toggleTheme} checked={theme == 'dark'} />

      <label htmlFor="toggle_checkbox">
        <div id="star">
          <div className="star" id="star-1">
            ★
          </div>
          <div className="star" id="star-2">
            ★
          </div>
        </div>
        <div id="moon"></div>
      </label>
    </DarkModeTogglerContainer>
  )
}
