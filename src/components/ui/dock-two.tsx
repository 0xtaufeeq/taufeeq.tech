import * as React from 'react'
import { motion, type Variants } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface DockItem {
  icon: LucideIcon
  label: string
  href?: string
  isActive?: boolean
  viewTransitionName?: string
  onClick?: () => void
}

interface DockProps {
  className?: string
  items: DockItem[]
  /** id of the icon row — the table of contents toggles padding on it */
  pillId?: string
  /** rendered above the icon row, inside the pill (portal target) */
  upper?: React.ReactNode
  /** rendered as the first entry of the icon row (portal target) */
  leading?: React.ReactNode
}

interface DockIconButtonProps extends Omit<DockItem, 'viewTransitionName'> {
  className?: string
}

const floatingAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

const DockIconButton = React.forwardRef<HTMLElement, DockIconButtonProps>(
  ({ icon: Icon, label, href, isActive, onClick, className }, ref) => {
    const MotionTag = (href ? motion.a : motion.button) as typeof motion.button

    return (
      <MotionTag
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(href ? { href } : { type: 'button' })}
        aria-label={label}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={cn(
          'group relative flex items-center justify-center rounded-full p-3',
          'transition-colors hover:bg-white/10',
          className
        )}
      >
        <Icon className='size-5 text-zinc-100' />
        {isActive && (
          <span className='absolute bottom-[3px] left-1/2 size-[3.5px] -translate-x-1/2 rounded-full bg-accent-300' />
        )}
        <span
          className={cn(
            'absolute -top-8 left-1/2 -translate-x-1/2',
            'rounded-md px-2 py-1 text-xs',
            'border border-white/10 bg-zinc-900 text-zinc-100',
            'opacity-0 group-hover:opacity-100',
            'pointer-events-none whitespace-nowrap transition-opacity'
          )}
        >
          {label}
        </span>
      </MotionTag>
    )
  }
)
DockIconButton.displayName = 'DockIconButton'

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ items, className, pillId, upper, leading }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex w-full items-center justify-center', className)}
      >
        <motion.div
          initial='initial'
          animate='animate'
          variants={floatingAnimation}
          className={cn(
            'flex flex-col rounded-[32px]',
            'border border-white/10 bg-zinc-950/90 shadow-lg backdrop-blur-lg',
            'transition-shadow duration-300 hover:shadow-xl hover:shadow-black/40'
          )}
        >
          {upper}
          <ul
            id={pillId}
            className='flex items-center gap-1 p-2 transition-all duration-300'
          >
            {leading}
            {items.map(({ viewTransitionName, ...item }) => (
              <li key={item.label} style={{ viewTransitionName }}>
                <DockIconButton {...item} />
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    )
  }
)
Dock.displayName = 'Dock'

export { Dock, DockIconButton }
