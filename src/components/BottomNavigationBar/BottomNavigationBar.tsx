import './BottomNavigationBar.css'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

import { Bookmarks } from '../icons/Bookmarks'
import { Briefcase } from '../icons/Briefcase'
import { ChatTeardropDots } from '../icons/ChatTeardrop'
import { HandWaving } from '../icons/HandWaving'
import { Info } from '../icons/Info'
import { Dock, DockIcon } from '../ui/dock'
import useScrollHandler from './useScrollHandler'
import { useTooltipHandler } from './useTooltipHandler'

export const bottomNavigationItems = [
  {
    name: 'Hi 👋',
    icon: HandWaving,
    href: '/',
    viewTransitionName: 'home'
  },
  {
    name: 'Projects',
    icon: Briefcase,
    href: '/projects',
    viewTransitionName: 'projects'
  },
  {
    name: 'Blog',
    icon: ChatTeardropDots,
    href: '/blog',
    viewTransitionName: 'blog'
  },
  {
    name: 'About',
    icon: Info,
    href: '/about',
    viewTransitionName: 'about'
  },
  {
    name: 'Bookmarks',
    icon: Bookmarks,
    href: '/bookmarks',
    viewTransitionName: 'bookmarks'
  }
] as const

const BottomNavigationBar = () => {
  const [currentPath, setCurrentPath] = useState('')
  const firstSegment = '/' + (currentPath.split('/').filter(Boolean)[0] ?? '')

  const navRef = useRef<HTMLDivElement>(null)

  const { handleScroll, setInitialPosition } = useScrollHandler(navRef)
  const { setupTooltip } = useTooltipHandler(navRef)

  const handlePathChange = () => {
    // hide the tooltip when the page is loaded
    const tip = document.querySelector<HTMLDivElement>('.tip')
    if (tip) {
      tip.style.setProperty('--show', '0')
    }
  }

  useEffect(() => {
    setCurrentPath(window.location.pathname)

    document.addEventListener('astro:page-load', handlePathChange)
    document.addEventListener('local-navigation', (e) => {
      setCurrentPath((e as CustomEvent).detail.path)
    })
    window.addEventListener('scroll', handleScroll)

    // Delay setup to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      setInitialPosition()
      setupTooltip()
      
      // Initialize CSS variables for tooltip
      document.documentElement.style.setProperty('--tip-x', '0')
      document.documentElement.style.setProperty('--tip-y', '0')
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('astro:page-load', handlePathChange)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div
        id='nav-container'
        ref={navRef}
        className={cn('nav', 'fixed z-10')}
        style={{ bottom: 'var(--bottom-nav-bar-offset)' }}
      >
        <nav
          onPointerMove={() => {
            // remove the css variable which force tooltip to be hidden
            const tip = document.querySelector<HTMLDivElement>('.tip')
            if (tip) {
              tip.style.removeProperty('--show')
            }
          }}
          onPointerEnter={() => {
            // Ensure tooltip is visible on hover
            const tip = document.querySelector<HTMLDivElement>('.tip')
            if (tip) {
              tip.style.removeProperty('--show')
            }
          }}
          className={cn(
            'mx-auto overflow-hidden rounded-[32px]',
            'border border-shark-950',
            'w-fit bg-black transition-all duration-300'
          )}
        >
          <div id='bottom-nav-bar-upper' className='w-full'></div>
          <Dock>
            <li id='bottom-nav-bar-leading'></li>
            {bottomNavigationItems.map(
              ({ name, icon: Icon, href, ...item }) => (
                <DockIcon
                  key={name}
                  name={item.viewTransitionName}
                  href={href}
                  onClick={() => setCurrentPath(href)}
                  aria-label={name}
                >
                  <Icon className='size-5' />
                  {firstSegment === href && (
                    <div className='absolute bottom-[3px] size-[3.5px] rounded-full bg-emerald-300'></div>
                  )}
                </DockIcon>
              )
            )}
          </Dock>
        </nav>
      </div>
      <div className='tip' aria-hidden='true'>
        <div className='tip__track'>
          <div />
          {bottomNavigationItems.map(({ name }) => (
            <div key={name}>{name}</div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BottomNavigationBar
