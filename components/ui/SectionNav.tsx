'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

export interface SectionNavItem {
  id: string
  label: string
}

/** Sticky editorial menubar that tracks and jumps between on-page sections.
 * Scroll-spy via IntersectionObserver; smooth scroll cooperates with Lenis
 * (window.__lenis) and falls back to native scrollIntoView. */
export function SectionNav({
  items,
  className
}: {
  items: SectionNavItem[]
  className?: string
}) {
  const [active, setActive] = useState(items[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-25% 0px -65% 0px' }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  const handleClick =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      const el = document.getElementById(id)
      if (!el) return
      setActive(id)
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -96 })
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      history.replaceState(null, '', `#${id}`)
    }

  return (
    <nav
      aria-label="Section navigation"
      className={cn(
        'sticky top-4 z-30 mx-auto flex w-fit items-center gap-1 rounded-full',
        'border border-line bg-paper/80 p-1.5 backdrop-blur-md',
        className
      )}
    >
      {items.map(({ id, label }) => {
        const isActive = active === id
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={handleClick(id)}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5',
              'font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors duration-300',
              isActive ? 'text-ink' : 'text-muted hover:text-ink'
            )}
          >
            <span
              className={cn(
                'inline-block size-1.5 rounded-full transition-colors duration-300',
                isActive ? 'bg-accent' : 'bg-transparent'
              )}
            />
            {label}
          </a>
        )
      })}
    </nav>
  )
}
