import { Fragment, type CSSProperties, type ReactNode } from 'react'

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
 * CSS keyframes with per-word animation-delay, so the words animate at
 * first paint instead of staying hidden until framer-motion hydrates.
 */
export function SplitText({
  segments,
  className,
  as: Tag = 'h1',
  delay = 0.15,
  stagger = 0.055
}: SplitTextProps) {
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
                  <span
                    className={cn('word-rise', segment.className)}
                    style={
                      {
                        '--delay': `${delay + index * stagger}s`
                      } as CSSProperties
                    }
                  >
                    {word}
                  </span>
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
  return (
    <div
      className={cn('fade-rise', className)}
      style={{ '--delay': `${delay}s`, '--rise-y': `${y}px` } as CSSProperties}
    >
      {children}
    </div>
  )
}
