'use client'

import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Mouse-tracking wrapper: every .card child gets --mouse-x/--mouse-y so the
 * spotlight + glowing border follow the cursor across the whole grid.
 */
export function BentoGrid({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    for (const card of Array.from(
      e.currentTarget.getElementsByClassName('card')
    )) {
      const rect = card.getBoundingClientRect()
      ;(card as HTMLElement).style.setProperty(
        '--mouse-x',
        `${e.clientX - rect.left}px`
      )
      ;(card as HTMLElement).style.setProperty(
        '--mouse-y',
        `${e.clientY - rect.top}px`
      )
    }
  }

  return (
    <section
      id="bento"
      onMouseMove={onMouseMove}
      className={cn(
        'auto-rows-[minmax(0,1fr)] grid-cols-[repeat(36,_minmax(0,_1fr))] gap-4',
        'flex-col max-lg:grid-cols-6 max-md:flex max-md:gap-4 md:grid',
        className
      )}
    >
      {children}
    </section>
  )
}
