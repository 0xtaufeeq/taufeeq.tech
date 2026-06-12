'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/** Oversized wordmark that parallaxes up as the footer scrolls into view. */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['60%', '0%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1])

  return (
    <div ref={ref} className="overflow-hidden bg-zinc-950 pb-4">
      <motion.p
        aria-hidden="true"
        style={reduceMotion ? undefined : { y, opacity }}
        className="pointer-events-none select-none whitespace-nowrap text-center font-serif text-[11vw] font-bold leading-[0.8] tracking-tighter text-white/5"
      >
        TAUFEEQ.
      </motion.p>
    </div>
  )
}
