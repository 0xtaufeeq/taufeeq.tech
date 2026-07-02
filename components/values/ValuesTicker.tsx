'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion'

import { VALUES } from '@/lib/site'
import { cn } from '@/lib/utils'

const COUNT = VALUES.length
const TOTAL = String(COUNT).padStart(2, '0')

/** One principle on the tape. The card nearest the viewport carries full ink;
 * neighbours recede, so the eye always has a single point of focus. */
function ValueItem({
  value,
  index,
  progress,
  reduceMotion
}: {
  value: (typeof VALUES)[number]
  index: number
  progress: MotionValue<number>
  reduceMotion: boolean | null
}) {
  const center = (index + 0.5) / COUNT
  const opacity = useTransform(
    progress,
    [center - 0.4, center, center + 0.4],
    [0.3, 1, 0.3]
  )

  return (
    <motion.article
      style={reduceMotion ? undefined : { opacity }}
      className="flex w-[min(78vw,540px)] shrink-0 flex-col gap-6 whitespace-normal"
    >
      <div className="flex items-center gap-5">
        <span className="font-mono text-[11px] tracking-[0.35em] text-accent">
          {value.number}
        </span>
        <hr className="hairline w-14" />
      </div>
      <h3 className="font-serif text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.04] tracking-tight text-ink">
        {value.title}
      </h3>
      <p className="max-w-md text-base leading-relaxed text-muted">
        {value.description}
      </p>
    </motion.article>
  )
}

/**
 * Pinned horizontal tape: the section is tall, the viewport sticks, and the
 * principles scrub sideways with scroll. The scrub is spring-smoothed so fast
 * scrolling settles with a glide instead of stopping dead. Falls back to a
 * static, manually scrollable strip for reduced motion.
 */
export function ValuesTicker() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [distance, setDistance] = useState(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return
      setDistance(
        Math.max(0, trackRef.current.scrollWidth - window.innerWidth)
      )
    }
    measure()
    window.addEventListener('resize', measure)
    // serif loads late and changes the track width — re-measure once it's in
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  })
  const x = useTransform(smooth, [0, 1], [0, -distance])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(COUNT - 1, Math.max(0, Math.floor(v * COUNT))))
  })

  return (
    <section
      id="values-ticker"
      ref={sectionRef}
      className="mt-32"
      style={{ height: reduceMotion ? 'auto' : `${distance + 1200}px` }}
    >
      <h2 className="sr-only">Core Values</h2>

      <div
        className={cn(
          'relative flex h-screen w-screen items-center',
          reduceMotion
            ? 'scrollbar-none overflow-x-auto'
            : 'sticky top-0 overflow-hidden'
        )}
        style={{ marginLeft: 'calc(50% - 50vw)' }}
      >
        <motion.div
          ref={trackRef}
          style={reduceMotion ? undefined : { x }}
          className="flex items-center gap-[9vw] pl-[10vw] will-change-transform"
        >
          {/* opening of the tape */}
          <header className="flex shrink-0 items-center">
            <span className="label">Core Values</span>
          </header>

          {VALUES.map((value, index) => (
            <ValueItem
              key={value.number}
              value={value}
              index={index}
              progress={smooth}
              reduceMotion={reduceMotion}
            />
          ))}

          {/* end of the tape — a full-viewport panel so the line sits centered
              on screen at full scroll, right before the section unpins */}
          <div className="flex w-screen shrink-0 items-center justify-center whitespace-normal">
            <p className="px-6 text-center font-serif text-[clamp(1.75rem,4vw,3rem)] font-light italic leading-snug text-muted">
              the rest is noise.
            </p>
          </div>
        </motion.div>

        {!reduceMotion && (
          <div className="pointer-events-none absolute inset-x-0 top-12 flex items-center justify-center gap-5 font-mono text-[10px] tracking-[0.35em] text-muted">
            <span className="text-ink">
              {String(active + 1).padStart(2, '0')}
            </span>
            <div className="relative h-px w-[min(40vw,20rem)] overflow-hidden bg-line-strong/50">
              <motion.div
                className="absolute inset-y-0 left-0 w-full origin-left bg-accent"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            <span>{TOTAL}</span>
          </div>
        )}
      </div>
    </section>
  )
}
