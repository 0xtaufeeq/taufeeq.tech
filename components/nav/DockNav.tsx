'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTransitionRouter } from 'next-view-transitions'

import { slideInOut } from '@/lib/view-transition'
import {
  Bookmark,
  Briefcase,
  Hand,
  Info,
  MessageCircle,
  type LucideIcon
} from 'lucide-react'

import { cn } from '@/lib/utils'

const NAV_ITEMS: { label: string; icon: LucideIcon; href: string }[] = [
  { label: 'Hi 👋', icon: Hand, href: '/' },
  { label: 'Projects', icon: Briefcase, href: '/projects' },
  { label: 'Blog', icon: MessageCircle, href: '/blog' },
  { label: 'About', icon: Info, href: '/about' },
  { label: 'Bookmarks', icon: Bookmark, href: '/bookmarks' }
]

/** Floating bottom dock — the primary navigation. Links navigate through
 * useTransitionRouter so the slide-up/reveal view transition plays. */
export function DockNav() {
  const pathname = usePathname()
  const router = useTransitionRouter()
  const firstSegment = '/' + (pathname?.split('/').filter(Boolean)[0] ?? '')

  const navigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // let the browser handle new-tab / download / context-menu clicks
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return
    e.preventDefault()
    if (href === pathname) return
    router.push(href, { onTransitionReady: slideInOut })
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center">
      <motion.nav
        aria-label="Primary"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto"
        style={{ viewTransitionName: 'dock-nav' }}
      >
        <motion.ul
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className={cn(
            'flex items-center gap-1 rounded-[32px] p-2',
            'border border-white/10 bg-zinc-950/90 shadow-lg shadow-black/40 backdrop-blur-lg'
          )}
        >
          {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
            const isActive = firstSegment === href
            return (
              <li key={href}>
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={href}
                    aria-label={label}
                    onClick={(e) => navigate(e, href)}
                    className={cn(
                      'group relative flex items-center justify-center rounded-full p-3',
                      'transition-colors hover:bg-white/10'
                    )}
                  >
                    <Icon
                      className={cn(
                        'size-5 transition-colors',
                        isActive ? 'text-accent-300' : 'text-zinc-100'
                      )}
                    />
                    {isActive && (
                      <span className="absolute bottom-[3px] left-1/2 size-[3.5px] -translate-x-1/2 rounded-full bg-accent-300" />
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
                  </a>
                </motion.div>
              </li>
            )
          })}
        </motion.ul>
      </motion.nav>
    </div>
  )
}
