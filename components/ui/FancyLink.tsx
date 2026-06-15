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
        'border border-line-strong px-5 py-2.5 text-sm text-ink',
        'transition-colors duration-300 hover:border-ink hover:text-accent',
        className
      )}
    >
      <span>{children}</span>
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  )
}
