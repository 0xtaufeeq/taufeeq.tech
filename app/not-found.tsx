'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' }
]

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* atmosphere */}
      <div className="dot-grid absolute inset-0" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />

      {/* watermark numeral */}
      <span
        aria-hidden="true"
        className="text-outline pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] select-none font-serif text-[clamp(16rem,46vw,34rem)] font-medium leading-none"
      >
        404
      </span>

      <div className="relative z-10 max-w-2xl text-center">
        <p className="label tracking-[0.4em] text-accent">
          err://page_not_found
          <span className="caret-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-accent" />
        </p>

        <h1 className="display mt-10 text-[clamp(3rem,9vw,5.5rem)] leading-[0.95] text-ink">
          Lost in{' '}
          <em className="text-muted">
            the{' '}
            <span className="text-accent not-italic">
              dark.
            </span>
          </em>
        </h1>

        <p className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-muted">
          This page doesn&apos;t exist, was moved, or never shipped. The lights
          are on everywhere else, though.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-primary group">
            Take me home
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <button onClick={() => history.back()} className="btn-secondary group">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Go back
          </button>
        </div>

        <div className="mt-20 flex items-center justify-center gap-8">
          <hr className="hairline w-16" aria-hidden="true" />
          <nav
            aria-label="Quick links"
            className="flex items-center gap-7 font-mono text-[11px] uppercase tracking-[0.25em]"
          >
            {QUICK_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-muted transition-colors hover:text-accent"
              >
                {label}
              </Link>
            ))}
          </nav>
          <hr className="hairline w-16" aria-hidden="true" />
        </div>
      </div>
    </main>
  )
}
