'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bell, Briefcase } from 'lucide-react'

import { cn } from '@/lib/utils'

import { BentoBadge } from './BentoCard'

interface NotificationCardProps {
  sender: string
  time: string
  message: string
  className?: string
  delay?: number
}

const NotificationCard = ({
  sender,
  time,
  message,
  className,
  delay = 0
}: NotificationCardProps) => (
  <motion.div
    initial={{ scale: 0, filter: 'blur(32px)' }}
    whileInView={{ scale: 1, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={cn(
      'flex w-[340px] items-center gap-4 rounded-2xl border border-line bg-card p-4 text-ink shadow-sm',
      'transition-all duration-300 group-hover:-mt-2 group-hover:scale-105',
      'max-xs:w-[300px]',
      className
    )}
  >
    <Bell className="size-6 shrink-0" />
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-3">
        <p className="truncate text-sm font-semibold">{sender}</p>
        <p className="shrink-0 text-xs text-muted">{time}</p>
      </div>
      <p className="truncate text-sm">{message}</p>
    </div>
  </motion.div>
)

export function FeaturedWork() {
  return (
    <Link
      href="/projects/devsphere"
      className={cn(
        'relative flex h-full flex-col gap-3 overflow-hidden rounded-[inherit] px-5 pb-8 pt-4',
        'max-xs:pb-36 md:max-lg:gap-4'
      )}
    >
      <div className="z-40 space-y-5">
        <BentoBadge icon={<Briefcase />} text="Featured work" className="w-fit" />
        <div className="space-y-3 xs:max-md:w-1/2">
          <p className="text-xl leading-none text-ink">DevSphere</p>
          <p className="text-sm leading-relaxed text-muted">
            Open Source and Web 3.0 Club at RV University.
          </p>
        </div>
      </div>

      <div className="absolute top-[164px] self-center max-xs:mt-4 xs:max-md:left-[calc(50%+16px)] xs:max-md:top-14 xs:max-md:scale-110">
        <div className="relative flex flex-col items-center">
          <div className="pointer-events-none absolute z-30 h-[125%] w-[125%] bg-gradient-to-t from-[var(--card)] to-transparent" />
          <NotificationCard
            sender="DevSphere"
            time="Just now"
            message="Welcome to the community!"
            className="z-20"
            delay={0.15}
          />
          <NotificationCard
            sender="DevSphere"
            time="1m ago"
            message="Membership request received"
            className="z-10 -mt-8 w-[88%] bg-line text-muted transition-all duration-500"
          />
        </div>
      </div>
    </Link>
  )
}
