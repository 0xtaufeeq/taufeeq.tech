'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

import { VALUES } from '@/lib/site'
import { cn } from '@/lib/utils'

/* Inline SVG flourishes used as "punctuation" between values in the ticker */
const CONNECTORS = [
  // wave
  <svg key="wave" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3 22 Q 15 4 28 22 T 53 22 T 78 22 T 103 22 T 128 22 T 147 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>,
  // loop flourish
  <svg key="loop" viewBox="0 0 130 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4 46 C 30 12 62 4 66 24 C 69 40 42 48 38 30 C 34 12 78 8 126 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>,
  // curved arrow
  <svg key="arrow" viewBox="0 0 130 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4 42 C 42 46 84 32 118 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M100 6 L120 9 L110 27" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>,
  // asterisk
  <svg key="asterisk" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 5 V43 M7 14 L41 34 M41 14 L7 34" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
  </svg>,
  // dip curve
  <svg key="dip" viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3 12 C 30 44 64 46 92 26 C 104 17 122 18 137 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
]

/* Variable spacing + slight tilts so the tape reads organically, not like slides */
const ITEM_GAPS = [
  'ml-[9vw]',
  'ml-[15vw]',
  'ml-[7vw]',
  'ml-[18vw]',
  'ml-[10vw]',
  'ml-[14vw]',
  'ml-[8vw]'
]
const CONNECTOR_TILTS = ['', 'rotate-3', '-rotate-2', '', 'rotate-2', '-scale-y-100', '-rotate-3']

/**
 * Pinned horizontal ticker: the section is tall, the viewport sticks, and the
 * tape scrubs sideways with scroll. Falls back to a manually scrollable strip
 * for reduced motion.
 */
export function ValuesTicker() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [distance, setDistance] = useState(0)

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
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

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
          className="flex items-center whitespace-nowrap pl-[8vw] pr-[14vw] will-change-transform"
        >
          {/* opening of the "sentence" */}
          <div className="flex items-center gap-6">
            <span className="label">
              Core Values
            </span>
            <span className="inline-block h-8 w-auto text-accent sm:h-10 [&>svg]:h-full [&>svg]:w-auto">
              {CONNECTORS[2]}
            </span>
          </div>

          {VALUES.map((value, index) => (
            <div
              key={value.number}
              className={cn('flex items-center', ITEM_GAPS[index])}
            >
              <span
                className={cn(
                  'mr-[4vw] inline-block h-[clamp(2rem,5vw,3.5rem)] w-auto shrink-0 text-accent/80',
                  '[&>svg]:h-full [&>svg]:w-auto',
                  CONNECTOR_TILTS[index]
                )}
              >
                {CONNECTORS[index % CONNECTORS.length]}
              </span>
              <span className="mr-4 self-start pt-[1vw] font-mono text-xs text-accent sm:text-sm">
                ( {value.number} )
              </span>
              <h3
                className={cn(
                  'font-serif text-[clamp(3rem,9vw,7.5rem)] leading-none',
                  index === 3
                    ? 'font-medium text-accent'
                    : index % 2 === 0
                      ? 'font-medium text-ink'
                      : 'font-light italic text-ink'
                )}
              >
                {value.title}
              </h3>
              <p className="ml-[3vw] inline-block w-56 whitespace-normal text-sm leading-relaxed text-muted sm:w-64">
                {value.description}
              </p>
            </div>
          ))}

          {/* end of the tape */}
          <div className="ml-[12vw] flex items-center gap-8">
            <span className="inline-block h-10 w-auto text-accent [&>svg]:h-full [&>svg]:w-auto">
              {CONNECTORS[3]}
            </span>
            <span className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-light italic leading-none text-muted">
              the rest is noise.
            </span>
          </div>
        </motion.div>

        {!reduceMotion && (
          <div className="pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
            keep scrolling
          </div>
        )}
      </div>
    </section>
  )
}
