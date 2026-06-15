import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Reveal } from '@/components/motion/Reveal'
import { BackToHome } from '@/components/ui/BackToHome'
import { ValuesTicker } from '@/components/values/ValuesTicker'

export const metadata: Metadata = {
  title: 'My Philosophy & Values',
  description:
    'The principles and beliefs that guide my work, leadership, and approach to building meaningful products.',
  alternates: { canonical: '/values' }
}

export default function ValuesPage() {
  return (
    <div className="relative mx-auto max-w-5xl px-6 py-16 sm:px-8">
      {/* atmosphere */}
      <div className="dot-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80vh]" />

      <BackToHome />

      {/* ---------- opener ---------- */}
      <header className="mt-24 sm:mt-32">
        <Reveal>
          <p className="label">
            Operating principles — est. 2022
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display mt-8 text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.98] tracking-tight text-ink">
            What I believe,
            <br />
            <em className="text-muted">
              and why it{' '}
              <span className="text-accent not-italic">
                matters.
              </span>
            </em>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-12 flex items-center gap-6">
            <hr className="hairline w-24" />
            <p className="label">
              Seven principles. Zero compromise.
            </p>
          </div>
        </Reveal>
      </header>

      {/* ---------- manifesto ---------- */}
      <section className="mt-28 grid gap-10 md:grid-cols-[140px_1fr] md:gap-16">
        <Reveal className="max-md:hidden">
          <div className="sticky top-28 space-y-3">
            <p className="label">
              Manifesto
            </p>
            <p className="font-mono text-[11px] tracking-[0.3em] text-accent">
              /01
            </p>
          </div>
        </Reveal>

        <div className="max-w-2xl space-y-8 text-lg leading-relaxed text-muted">
          <Reveal>
            <p className="drop-cap text-xl leading-relaxed text-muted">
              Great work starts with curiosity. The kind that makes you ask{' '}
              <em className="font-serif text-accent">why</em> when everyone
              else settles for <em className="font-serif text-accent">how</em>.
              The kind that refuses to accept good enough.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Building something meaningful isn&apos;t about chasing trends or
              pleasing everyone. It&apos;s about having a clear point of view
              and the courage to defend it. The best founders and leaders
              I&apos;ve met don&apos;t react to the world —{' '}
              <em className="font-serif text-ink">they shape it.</em>
            </p>
          </Reveal>
          <Reveal>
            <p>
              I care about three things: clarity, craftsmanship, and
              conviction. Clarity in thought before action. Craftsmanship in
              every detail — code, design, or a conversation. Conviction to
              stay with what matters when things get hard.
            </p>
          </Reveal>
          <Reveal>
            <p>
              And I don&apos;t believe in balance as much as{' '}
              <em className="font-serif text-ink">alignment</em>. When your
              work aligns with who you are, energy flows instead of being
              managed. When a team aligns around purpose, magic happens.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- the seven (pinned horizontal tape) ---------- */}
      <ValuesTicker />

      {/* ---------- closing ---------- */}
      <section className="mb-16 mt-12 text-center sm:mt-4">
        <Reveal>
          <hr className="hairline mx-auto mb-16 w-2/3" />
          <p className="mx-auto max-w-xl font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-light italic leading-snug text-muted">
            If any of this resonates —{' '}
            <span className="text-accent not-italic font-medium">
              we should talk.
            </span>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/about" className="btn-primary group">
              More about me
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/blog" className="btn-secondary">
              Read the blog
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
