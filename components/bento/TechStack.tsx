'use client'

import { Layers } from 'lucide-react'

import { TECH_ICON_MAP } from '@/components/icons'
import { TECH_STACKS } from '@/lib/site'
import { cn } from '@/lib/utils'

import { BentoBadge } from './BentoCard'

const ROWS = [TECH_STACKS.slice(0, 5), TECH_STACKS.slice(5)]

/** Two counter-scrolling marquee rows of the tools I reach for. */
export function TechStack() {
  return (
    <div className="relative flex h-full flex-col gap-5 overflow-hidden px-4 pb-6 pt-4">
      <BentoBadge icon={<Layers />} text="Tech stack" className="w-fit" />

      <div className="flex grow flex-col justify-center gap-4">
        {ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="group flex overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, black 12%, black 88%, transparent)'
            }}
          >
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className={cn(
                  'animate-marquee flex w-max shrink-0 items-center group-hover:[animation-play-state:paused]',
                  rowIndex === 1 && '[animation-direction:reverse]'
                )}
                style={{ '--duration': '36s' } as React.CSSProperties}
              >
                {row.map(({ name, description }) => {
                  const Icon = TECH_ICON_MAP[name as keyof typeof TECH_ICON_MAP]
                  return (
                    <div
                      key={`${name}-${copy}`}
                      title={`${name} — ${description}`}
                      className={cn(
                        'mx-2 flex items-center gap-3 rounded-2xl px-4 py-3',
                        'border border-line bg-card text-muted',
                        'transition-colors duration-300 hover:border-accent hover:text-accent'
                      )}
                    >
                      <Icon className="size-6" />
                      <span className="whitespace-nowrap text-sm">{name}</span>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
