import type { Metadata } from 'next'
import { Lightbulb } from 'lucide-react'

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
    <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
      <BackToHome />

      <div className="mt-16 space-y-6">
        <Reveal>
          <div className="section-badge">
            <Lightbulb className="size-4" />
            <span className="text-sm font-medium tracking-wide">
              Philosophy &amp; Values
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="page-title text-zinc-100">
            My Philosophy and Values
          </h1>
        </Reveal>
      </div>

      <Reveal className="mt-16 max-w-3xl">
        <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
          <p>
            I believe great work starts with curiosity. The kind that makes you
            ask{' '}
            <em className="font-medium italic text-accent-300">why</em> when
            everyone else says{' '}
            <em className="font-medium italic text-accent-300">how</em>. The
            kind that refuses to settle for good enough.
          </p>

          <p>
            I&apos;ve learned that building something meaningful isn&apos;t
            about chasing trends or pleasing everyone. It&apos;s about having a
            clear point of view and the courage to defend it. The best founders
            and leaders I&apos;ve met don&apos;t just react to the world, they
            shape it.
          </p>

          <p>
            I care about clarity, craftsmanship, and conviction. Clarity in
            thought before action. Craftsmanship in every detail, whether
            it&apos;s code, design, or a conversation. Conviction to stick with
            what matters when things get hard.
          </p>

          <p>
            I don&apos;t believe in balance as much as alignment. When your
            work aligns with who you are, energy flows instead of being
            managed. When your team aligns around purpose, magic happens.
          </p>
        </div>
      </Reveal>

      <ValuesTicker />
    </div>
  )
}
