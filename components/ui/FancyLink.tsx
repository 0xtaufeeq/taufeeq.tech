import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'

interface FancyLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  'aria-label'?: string
}

/** Pill link with sliding arrow — used for "View all" CTAs. */
export function FancyLink({ href, children, className, ...rest }: FancyLinkProps) {
  return (
    <Link
      href={href}
      {...rest}
      className={cn(
        'group inline-flex shrink-0 items-center gap-2 rounded-full',
        'border border-zinc-800 bg-zinc-900/40 px-5 py-2.5 text-sm text-zinc-300',
        'transition-all duration-300 hover:border-accent-500/40 hover:text-accent-300',
        className
      )}
    >
      <span>{children}</span>
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  )
}
