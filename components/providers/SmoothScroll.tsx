'use client'

import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

/** Lenis smooth scrolling, skipped for reduced-motion users. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true
    })
    window.__lenis = lenis

    let frame: number
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])

  return <>{children}</>
}
