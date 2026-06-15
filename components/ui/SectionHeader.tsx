import type { ReactNode } from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  badge: ReactNode
  section: string
  title: ReactNode
  description: ReactNode
  forHomePage?: boolean
  className?: string
}

export function SectionHeader({
  badge,
  section,
  title,
  description,
  forHomePage,
  className
}: SectionHeaderProps) {
  const SectionTag = forHomePage ? 'h2' : 'h1'
  const TitleTag = forHomePage ? 'h3' : 'h2'

  return (
    <Reveal className={cn('space-y-6 sm:space-y-8', className)}>
      <div className="label inline-flex items-center gap-2">
        <span aria-hidden className="[&>svg]:size-3.5 text-accent">
          {badge}
        </span>
        <SectionTag className="text-sm font-medium tracking-wide max-sm:text-xs">
          {section}
        </SectionTag>
      </div>
      <TitleTag
        className={cn(
          'display leading-[1.02] text-ink',
          forHomePage
            ? 'text-[clamp(2rem,7vw,3rem)]'
            : 'text-[clamp(2rem,7vw,3.25rem)]'
        )}
      >
        {title}
      </TitleTag>
      <p className="max-w-2xl leading-relaxed text-muted max-md:text-sm">
        {description}
      </p>
    </Reveal>
  )
}
