import './BottomNavigationBar.css'

import { useEffect, useRef, useState } from 'react'
import { Bookmark, Briefcase, Hand, Info, MessageCircle } from 'lucide-react'

import { Dock } from '../ui/dock-two'
import useScrollHandler from './useScrollHandler'

export const bottomNavigationItems = [
  {
    label: 'Hi 👋',
    icon: Hand,
    href: '/',
    viewTransitionName: 'home'
  },
  {
    label: 'Projects',
    icon: Briefcase,
    href: '/projects',
    viewTransitionName: 'projects'
  },
  {
    label: 'Blog',
    icon: MessageCircle,
    href: '/blog',
    viewTransitionName: 'blog'
  },
  {
    label: 'About',
    icon: Info,
    href: '/about',
    viewTransitionName: 'about'
  },
  {
    label: 'Bookmarks',
    icon: Bookmark,
    href: '/bookmarks',
    viewTransitionName: 'bookmarks'
  }
] as const

const BottomNavigationBar = () => {
  const [currentPath, setCurrentPath] = useState('')
  const firstSegment = '/' + (currentPath.split('/').filter(Boolean)[0] ?? '')

  const navRef = useRef<HTMLDivElement>(null)
  const { handleScroll, setInitialPosition, resetPosition } =
    useScrollHandler(navRef)

  useEffect(() => {
    const syncPath = () => {
      setCurrentPath(window.location.pathname)
      resetPosition()
    }
    const onLocalNavigation = (e: Event) =>
      setCurrentPath((e as CustomEvent).detail.path)

    syncPath()
    document.addEventListener('astro:page-load', syncPath)
    document.addEventListener('local-navigation', onLocalNavigation)
    window.addEventListener('scroll', handleScroll)

    // Delay setup to ensure DOM is ready
    const timeoutId = setTimeout(setInitialPosition, 100)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('astro:page-load', syncPath)
      document.removeEventListener('local-navigation', onLocalNavigation)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      id='nav-container'
      ref={navRef}
      className='nav fixed z-10'
      style={{ bottom: 'var(--bottom-nav-bar-offset)' }}
    >
      <nav aria-label='Primary'>
        <Dock
          className='w-auto'
          pillId='nav-dock'
          upper={<div id='bottom-nav-bar-upper' className='w-full' />}
          leading={<li id='bottom-nav-bar-leading' />}
          items={bottomNavigationItems.map((item) => ({
            ...item,
            isActive: firstSegment === item.href,
            onClick: () => setCurrentPath(item.href)
          }))}
        />
      </nav>
    </div>
  )
}

export default BottomNavigationBar
