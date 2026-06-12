'use client'

import { useEffect, useRef } from 'react'

interface Ember {
  x: number
  y: number
  size: number
  speed: number
  drift: number
  alpha: number
  pulse: number
}

/**
 * Lightweight canvas ember field — emerald sparks drifting upward with
 * gentle mouse parallax. Desktop fine-pointers only, started on idle, so
 * phones never pay for it (replaces the old ~500KB three.js scene).
 */
export function EmberField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine) and (min-width: 768px)').matches)
      return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame: number
    let embers: Ember[] = []
    let width = 0
    let height = 0
    let mouseX = 0
    let started = false

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawn = (randomY = false): Ember => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + 10,
      size: 0.8 + Math.random() * 2.2,
      speed: 0.2 + Math.random() * 0.55,
      drift: (Math.random() - 0.5) * 0.3,
      alpha: 0.15 + Math.random() * 0.55,
      pulse: Math.random() * Math.PI * 2
    })

    const start = () => {
      if (started) return
      started = true
      resize()
      embers = Array.from({ length: 70 }, () => spawn(true))

      let t = 0
      const loop = () => {
        t += 0.016
        ctx.clearRect(0, 0, width, height)

        for (const ember of embers) {
          ember.y -= ember.speed
          ember.x += ember.drift + mouseX * 0.15 * (ember.size / 3)

          if (ember.y < -12 || ember.x < -12 || ember.x > width + 12) {
            Object.assign(ember, spawn())
          }

          const flicker = 0.75 + 0.25 * Math.sin(t * 2 + ember.pulse)
          ctx.beginPath()
          ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 217, 126, ${ember.alpha * flicker})`
          ctx.shadowColor = 'rgba(0, 217, 126, 0.9)'
          ctx.shadowBlur = ember.size * 5
          ctx.fill()
          ctx.shadowBlur = 0
        }

        frame = requestAnimationFrame(loop)
      }
      frame = requestAnimationFrame(loop)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    if ('requestIdleCallback' in window) {
      requestIdleCallback(start, { timeout: 2500 })
    } else {
      setTimeout(start, 350)
    }

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 z-0 w-screen"
      style={{ left: 'calc(50% - 50vw)' }}
    >
      <canvas ref={canvasRef} className="size-full" />
      {/* soft emerald glow behind the headline */}
      <div className="absolute left-1/2 top-1/3 h-[420px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/[0.07] blur-[120px]" />
    </div>
  )
}
