'use client'

import confetti from 'canvas-confetti'

import { SOCIAL_ICON_MAP } from '@/components/icons'
import { Magnetic } from '@/components/motion/Magnetic'
import { SOCIALS } from '@/lib/site'
import { cn } from '@/lib/utils'

const KEY_CLASSES = cn(
  'relative flex items-center justify-center overflow-hidden rounded-2xl',
  'size-[4.5rem] max-sm:size-14',
  'border bg-card text-ink',
  'shadow-sm transition-all duration-300',
  'hover:-translate-y-0.5',
  'active:translate-y-0',
  '[&>svg]:size-8 max-sm:[&>svg]:size-7 [&>svg]:transition-all [&>svg]:duration-300',
  'hover:[&>svg]:scale-110'
)

const SOCIAL_KEY_CLASSES = cn(
  KEY_CLASSES,
  'border-line-strong hover:border-ink hover:text-accent'
)

const fireConfetti = (e: React.MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const origin = {
    x: (rect.left + rect.width / 2) / window.innerWidth,
    y: (rect.top + rect.height / 2) / window.innerHeight
  }

  const defaults = {
    origin,
    colors: ['#1c7d4d', '#166b42', '#4bc585', '#a8d9bf', '#16160f'],
    disableForReducedMotion: true
  }
  const count = 200
  const fire = (ratio: number, opts: confetti.Options) =>
    confetti({ ...defaults, ...opts, particleCount: Math.floor(count * ratio) })

  fire(0.25, { spread: 26, startVelocity: 55 })
  fire(0.2, { spread: 60 })
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
  fire(0.1, { spread: 120, startVelocity: 45 })
}

/** Social "keyboard" + Book A Call key — magnetic, with confetti on booking. */
export function Keyboard({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-start text-center max-xs:flex-col', className)}>
      <div className="flex items-center justify-center gap-4">
        {SOCIALS.map(({ name, href }) => {
          const Icon = SOCIAL_ICON_MAP[name]
          return (
            <Magnetic key={name} strength={0.3}>
              <a
                aria-label={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={SOCIAL_KEY_CLASSES}
              >
                <Icon />
              </a>
            </Magnetic>
          )
        })}
      </div>
      <Magnetic
        strength={0.25}
        className="ml-4 flex items-center justify-center max-xs:ml-0 max-xs:mt-6 max-xs:w-full max-xs:justify-start"
      >
        {/* Booking widget: update data-cal-link / data-cal-namespace if the Cal.com event changes */}
        <button
          type="button"
          aria-label="Book A Call"
          data-cal-namespace="30min"
          data-cal-link="0xtaufeeq/30min"
          data-cal-config='{"layout":"month_view"}'
          onClick={fireConfetti}
          className={cn(
            // Mirrors KEY_CLASSES' look, but uses separate height/width so the
            // square `size-*` can't override the pill width (it was collapsing
            // to a 56px square on phones, wrapping the label to 3 lines).
            'relative flex items-center justify-center overflow-hidden rounded-2xl',
            'border shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0',
            'h-[4.5rem] w-[180px] max-sm:h-14 max-xs:w-full',
            'font-mono text-[13px] font-semibold uppercase tracking-[0.08rem]',
            'border-transparent bg-ink text-paper',
            'hover:bg-accent hover:text-accent-contrast'
          )}
        >
          Book A Call
        </button>
      </Magnetic>
    </div>
  )
}
