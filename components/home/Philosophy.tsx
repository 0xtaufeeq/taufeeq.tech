import { Sparkles, Target, Users, Zap } from 'lucide-react'

import { Reveal } from '@/components/motion/Reveal'
import { FancyLink } from '@/components/ui/FancyLink'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { PHILOSOPHY_CARDS } from '@/lib/site'

const ICONS = { zap: Zap, users: Users, sparkles: Sparkles } as const

export function Philosophy() {
  return (
    <section id="philosophy" className="mt-40 scroll-mt-16">
      <div className="items-center justify-between gap-8 lg:flex lg:gap-12">
        <SectionHeader
          forHomePage
          badge={<Target className="size-4" />}
          section="Philosophy & Values"
          title="Building the Future"
          description="Innovation is not just about technology. It is about making a dent in the universe. These principles drive my vision to create products that change lives."
        />
        <div className="shrink-0 max-lg:hidden">
          <FancyLink
            href="/values"
            aria-label="Learn more about my philosophy and values"
          >
            Learn more
          </FancyLink>
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PHILOSOPHY_CARDS.map(({ title, description, icon }, index) => {
          const Icon = ICONS[icon]
          return (
            <Reveal key={title} delay={index * 0.1}>
              <div className="ui-card group h-full p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-accent-500/10">
                  <Icon className="size-6 text-accent-400" />
                </div>
                <h3 className="font-display mb-2 text-xl font-semibold text-zinc-100">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {description}
                </p>
              </div>
            </Reveal>
          )
        })}
      </div>

      <div className="mt-8 flex justify-center lg:hidden">
        <FancyLink
          href="/values"
          aria-label="Learn more about my philosophy and values"
        >
          Learn more
        </FancyLink>
      </div>
    </section>
  )
}
