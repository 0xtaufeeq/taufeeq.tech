import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface BentoCardProps {
  children: ReactNode
  className?: string
}

/** Spotlight card — the radial glow follows the cursor (wired up in BentoGrid). */
export function BentoCard({ children, className }: BentoCardProps) {
  return (
    <div className={cn('card group rounded-3xl p-px', className)}>
      <div className="card-content overflow-hidden">{children}</div>
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
        'flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/60 px-3 py-1.5',
        'text-xs uppercase tracking-widest text-zinc-400',
        className
      )}
    >
      {icon && <span className="[&>svg]:size-3.5">{icon}</span>}
      {text && <span>{text}</span>}
    </div>
  )
}
