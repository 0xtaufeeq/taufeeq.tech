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
      <div className="section-badge">
        {badge}
        <SectionTag className="text-sm font-medium tracking-wide max-sm:text-xs">
          {section}
        </SectionTag>
      </div>
      <TitleTag
        className={cn(
          'font-heading font-semibold leading-[1.02] text-zinc-100',
          forHomePage
            ? 'text-[clamp(2rem,7vw,3rem)]'
            : 'text-[clamp(2rem,7vw,3.25rem)]'
        )}
      >
        {title}
      </TitleTag>
      <p className="max-w-2xl leading-relaxed text-zinc-400 max-md:text-sm">
        {description}
      </p>
    </Reveal>
  )
}
