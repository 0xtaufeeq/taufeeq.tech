'use client'

import { useEffect, useRef } from 'react'

/**
 * Dot + trailing ring cursor (difference blend, so it reads on any surface).
 * The dot tracks the pointer exactly; the ring eases behind it, swells over
 * interactive elements, and dips on click. Fine pointers only.
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = rootRef.current
    if (!root) return

    const dot = root.querySelector<HTMLElement>('.cursor-dot')
    const ring = root.querySelector<HTMLElement>('.cursor-ring')
    if (!dot || !ring) return

    document.documentElement.classList.add('has-custom-cursor')

    const INTERACTIVE =
      'a, button, [role="button"], input, textarea, select, label, summary, [data-magnetic], [data-cursor="hover"]'

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let frame: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.translate = `${mouseX}px ${mouseY}px`
      if (root.dataset.hidden === 'true') root.dataset.hidden = 'false'
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      root.dataset.hover = target?.closest(INTERACTIVE) ? 'true' : 'false'
    }

    const onDown = () => (root.dataset.press = 'true')
    const onUp = () => (root.dataset.press = 'false')
    const onLeave = () => (root.dataset.hidden = 'true')

    // Critically damped easing for a smooth, lag-light trail.
    const loop = () => {
      ringX += (mouseX - ringX) * 0.2
      ringY += (mouseY - ringY) * 0.2
      ring.style.translate = `${ringX}px ${ringY}px`
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown, { passive: true })
    window.addEventListener('mouseup', onUp, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div id="site-cursor" ref={rootRef} aria-hidden="true" data-hidden="true">
      <div className="cursor-ring" style={{ translate: '-100px -100px' }} />
      <div className="cursor-dot" style={{ translate: '-100px -100px' }} />
    </div>
  )
}
