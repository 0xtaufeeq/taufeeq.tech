'use client'

import { useMemo, useState } from 'react'

import { GithubIcon } from '@/components/icons'
import type { GithubContributionData } from '@/lib/github'
import { formatDate, formatNumber, getDateSuffix } from '@/lib/utils'

import { BentoBadge } from './BentoCard'

const CELL = 16
const GAP = 4
const LEVELS = [
  'var(--line)',
  'color-mix(in srgb, var(--accent) 35%, transparent)',
  'color-mix(in srgb, var(--accent) 65%, transparent)',
  'var(--accent)'
]

const levelFor = (count: number) => {
  if (count === 0) return LEVELS[0]
  if (count < 4) return LEVELS[1]
  if (count < 8) return LEVELS[2]
  return LEVELS[3]
}

/** Custom contribution heat-map — last ~6 months in weekly columns. */
export function GithubActivity(props: GithubContributionData) {
  const defaultLabel = `${formatNumber(props.totalContributions)} contributions in the last year`
  const [hovered, setHovered] = useState<string | null>(null)

  const weeks = useMemo(() => {
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const recent = props.contributions.filter(
      (c) => new Date(c.date) >= sixMonthsAgo
    )

    const result: GithubContributionData['contributions'][] = []
    for (let i = 0; i < recent.length; i += 7) {
      result.push(recent.slice(i, i + 7))
    }
    return result
  }, [props.contributions])

  const width = weeks.length * (CELL + GAP)
  const height = 7 * (CELL + GAP)

  const tileLabel = (date: string, count: number) => {
    const d = new Date(date)
    const formatted =
      d.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }) +
      getDateSuffix(d.getDate())
    return `${count ? formatNumber(count) : 'No'} contributions on ${formatted}`
  }

  return (
    <div className="relative flex h-full flex-col justify-between px-4 pb-5 pt-4 max-md:gap-4">
      <div className="flex items-baseline justify-between gap-4 max-xs:flex-col">
        <BentoBadge icon={<GithubIcon />} text="Github activity" />
        <p className="line-clamp-1 text-sm text-muted">
          {hovered ?? defaultLabel}
        </p>
      </div>
      <div className="scrollbar-color w-full overflow-x-auto">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          onMouseLeave={() => setHovered(null)}
          className="min-w-[550px]"
        >
          {weeks.map((week, wi) =>
            week.map((day, di) => (
              <rect
                key={day.date}
                x={wi * (CELL + GAP)}
                y={di * (CELL + GAP)}
                width={CELL}
                height={CELL}
                rx={4}
                fill={levelFor(day.count)}
                className="transition-all hover:brightness-125"
                onMouseEnter={() => setHovered(tileLabel(day.date, day.count))}
              />
            ))
          )}
        </svg>
      </div>
      <p className="text-sm text-muted max-sm:text-xs">
        Last pushed on {formatDate(new Date(props.lastPushedAt))}
      </p>
    </div>
  )
}
