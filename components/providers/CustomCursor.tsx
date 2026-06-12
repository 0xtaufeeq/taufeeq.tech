'use client'

import { useEffect, useRef } from 'react'

/**
 * Dot + trailing ring cursor in difference blend mode.
 * Fine pointers only — touch devices never see it.
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = rootRef.current
    if (!root) return

    document.documentElement.classList.add('has-custom-cursor')

    const dot = root.querySelector<HTMLElement>('.cursor-dot')
    const ring = root.querySelector<HTMLElement>('.cursor-ring')

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let frame: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dot) dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, textarea, select, [data-magnetic]'
      )
      if (ring) {
        ring.style.transform = interactive ? 'scale(1.6)' : 'scale(1)'
        ring.style.opacity = interactive ? '0.9' : '1'
      }
    }

    const loop = () => {
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16
      if (ring)
        ring.style.translate = `${ringX}px ${ringY}px`
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div id="site-cursor" ref={rootRef} aria-hidden="true">
      <div className="cursor-dot" />
      <div className="cursor-ring" style={{ translate: '-100px -100px' }} />
    </div>
  )
}
