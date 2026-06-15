import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface BentoCardProps {
  children: ReactNode
  className?: string
}

/** Spotlight card — the radial glow follows the cursor (wired up in BentoGrid). */
export function BentoCard({ children, className }: BentoCardProps) {
  return (
    <div className={cn('card group rounded-3xl', className)}>
      <div className="card-content overflow-hidden rounded-3xl">{children}</div>
    </div>
  )
}

interface BentoBadgeProps {
  icon?: ReactNode
  text?: string
  className?: string
}

export function BentoBadge({ icon, text, className }: BentoBadgeProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-full border border-line bg-paper/80 px-3 py-1.5 backdrop-blur',
        'text-xs uppercase tracking-widest text-muted',
        className
      )}
    >
      {icon && <span className="[&>svg]:size-3.5">{icon}</span>}
      {text && <span>{text}</span>}
    </div>
  )
}
