import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface FadeProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/** Simple blur-rise entrance used for hero sub-elements. CSS-driven so it
 * plays at first paint without waiting for hydration. */
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
