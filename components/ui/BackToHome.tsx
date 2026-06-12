import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { cn } from '@/lib/utils'

export function BackToHome({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center gap-2 text-sm text-zinc-400',
        'transition-colors duration-300 hover:text-accent-300',
        className
      )}
    >
      <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
      <span>Back to home</span>
    </Link>
  )
}
