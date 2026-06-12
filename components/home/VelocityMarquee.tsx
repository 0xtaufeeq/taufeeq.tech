'use client'

import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap
} from 'framer-motion'

import { MARQUEE_WORDS } from '@/lib/site'
import { cn } from '@/lib/utils'

const Asterisk = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M24 5 V43 M7 14 L41 34 M41 14 L7 34"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
)

/**
 * Scroll-velocity marquee: drifts on its own, accelerates and skews with
 * scroll speed, reverses direction when scrolling up.
 */
export function VelocityMarquee() {
  const reduceMotion = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })
  const velocityFactor = useTransform(smoothVelocity, [-3000, 0, 3000], [-4, 1, 4], {
    clamp: true
  })
  const skewX = useTransform(smoothVelocity, [-3000, 3000], ['-8deg', '8deg'])

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const directionRef = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return
    let moveBy = directionRef.current * -1.8 * (delta / 1000)

    const factor = velocityFactor.get()
    if (factor < 0) directionRef.current = -1
    else if (factor > 0) directionRef.current = 1

    moveBy += moveBy * Math.abs(factor)
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <aside
      aria-label="Roles and interests"
      className="relative -mx-12 mt-8 overflow-hidden border-y border-white/5 py-5 max-sm:-mx-4"
    >
      <motion.div
        className="flex w-max items-center will-change-transform"
        style={reduceMotion ? undefined : { x, skewX }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1 || undefined}
          >
            {MARQUEE_WORDS.map((word, index) => (
              <span key={`${word}-${copy}`} className="flex items-center">
                <span
                  className={cn(
                    'whitespace-nowrap px-8 font-serif text-2xl leading-none sm:text-3xl',
                    index % 2 === 0
                      ? 'font-medium text-zinc-200'
                      : 'font-light italic text-zinc-500'
                  )}
                >
                  {word}
                </span>
                <Asterisk className="size-4 shrink-0 text-accent-500 sm:size-5" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </aside>
  )
}
