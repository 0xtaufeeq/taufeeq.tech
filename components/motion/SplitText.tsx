'use client'

import { Fragment, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'

interface Segment {
  text: string
  className?: string
  block?: boolean
}

interface SplitTextProps {
  segments: Segment[]
  className?: string
  as?: 'h1' | 'h2' | 'p'
  delay?: number
  stagger?: number
}

/**
 * Word-by-word blur/rise reveal — the hero headline treatment.
 * Each word animates from below with a blur, like 21st.dev's BlurText.
 */
export function SplitText({
  segments,
  className,
  as: Tag = 'h1',
  delay = 0.15,
  stagger = 0.055
}: SplitTextProps) {
  const reduceMotion = useReducedMotion()
  let wordIndex = 0

  return (
    <Tag className={className}>
      {segments.map((segment, sIndex) => (
        <Fragment key={sIndex}>
          {segment.block && <br />}
          {segment.text.split(' ').map((word, wIndex) => {
            const index = wordIndex++
            return (
              <Fragment key={`${sIndex}-${wIndex}`}>
                <span className="inline-block overflow-visible">
                  <motion.span
                    className={cn(
                      'inline-block will-change-transform',
                      segment.className
                    )}
                    initial={
                      reduceMotion
                        ? false
                        : { y: '70%', opacity: 0, filter: 'blur(10px)' }
                    }
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    transition={{
                      duration: 1,
                      ease: [0.215, 0.61, 0.355, 1],
                      delay: delay + index * stagger
                    }}
                  >
                    {word}
                  </motion.span>
                </span>{' '}
              </Fragment>
            )
          })}
        </Fragment>
      ))}
    </Tag>
  )
}

interface FadeProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/** Simple blur-rise entrance used for hero sub-elements. */
export function FadeIn({ children, className, delay = 0, y = 28 }: FadeProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, ease: [0.39, 0.575, 0.565, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
