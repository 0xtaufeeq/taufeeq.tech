'use client'

import confetti from 'canvas-confetti'

import { SOCIAL_ICON_MAP } from '@/components/icons'
import { Magnetic } from '@/components/motion/Magnetic'
import { SOCIALS } from '@/lib/site'
import { cn } from '@/lib/utils'

const KEY_CLASSES = cn(
  'relative flex items-center justify-center overflow-hidden rounded-2xl',
  'size-[4.5rem] max-sm:size-14',
  'border border-zinc-700/60 text-zinc-200',
  'bg-gradient-to-br from-zinc-900/90 to-[#121217]/95 backdrop-blur-[10px]',
  'shadow-[0_1px_2px_0_rgba(0,0,0,0.3),0_4px_8px_-2px_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.05)]',
  'transition-all duration-300',
  'hover:-translate-y-0.5 hover:border-accent-500/40',
  'hover:shadow-[0_2px_4px_0_rgba(0,0,0,0.4),0_8px_16px_-4px_rgba(0,0,0,0.3),0_0_20px_-5px_rgba(0,217,126,0.3),inset_0_1px_0_0_rgba(255,255,255,0.08)]',
  'active:translate-y-0 active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.3)]',
  '[&>svg]:size-8 max-sm:[&>svg]:size-7 [&>svg]:transition-all [&>svg]:duration-300',
  'hover:[&>svg]:scale-110 hover:[&>svg]:drop-shadow-[0_0_8px_rgba(0,217,126,0.4)]'
)

const fireConfetti = (e: React.MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const origin = {
    x: (rect.left + rect.width / 2) / window.innerWidth,
    y: (rect.top + rect.height / 2) / window.innerHeight
  }

  const defaults = {
    origin,
    colors: ['#00d97e', '#00b368', '#25e394', '#5ef0b4', '#a0f8d2'],
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
                className={KEY_CLASSES}
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
            KEY_CLASSES,
            'w-[180px] font-mono text-[13px] font-semibold uppercase tracking-[0.08rem] text-white',
            'border-accent-500/40 bg-gradient-to-br from-accent-500/10 to-accent-600/10',
            'shadow-[0_0_20px_-5px_rgba(0,217,126,0.15),inset_0_0_20px_-5px_rgba(0,217,126,0.15)]',
            'hover:border-accent-500/80 hover:from-accent-500/20 hover:to-accent-600/20',
            'hover:shadow-[0_0_25px_-5px_rgba(0,217,126,0.3),inset_0_0_25px_-5px_rgba(0,217,126,0.2)]'
          )}
        >
          Book A Call
        </button>
      </Magnetic>
    </div>
  )
}
