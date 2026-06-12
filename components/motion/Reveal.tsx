'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

/** Scroll-triggered reveal — fades and glides content up as it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  once = true
}: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
