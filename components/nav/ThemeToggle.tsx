'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { SolarSwitch } from '@/components/ui/animated-theme-toggle'
import { getIsDark, toggleTheme } from '@/lib/theme-transition'
import { cn } from '@/lib/utils'

/** Dock theme toggle — morphing sun/moon icon + circular spread transition.
 * Theme is applied (and persisted) by lib/theme-transition; the before-paint
 * script in layout.tsx prevents a flash on load. */
export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDark(getIsDark())

    // Keep the icon in sync while following the OS (no explicit preference).
    const q = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (!localStorage.getItem('theme')) setDark(getIsDark())
    }
    q.addEventListener('change', onChange)
    return () => q.removeEventListener('change', onChange)
  }, [])

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setDark(toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 }))
  }

  return (
    <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
      <button
        onClick={onClick}
        aria-label="Toggle color theme"
        className={cn(
          'group relative flex items-center justify-center rounded-full p-3',
          'text-muted transition-colors hover:bg-ink/5 hover:text-ink'
        )}
      >
        <span className="sr-only">Toggle theme</span>
        {mounted ? (
          <SolarSwitch isDark={dark} className="size-5" />
        ) : (
          <span className="size-5" />
        )}
      </button>
    </motion.div>
  )
}
