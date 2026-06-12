import { FadeIn } from '@/components/motion/FadeIn'

import { EmberField } from './EmberField'
import { HeroTitle } from './HeroTitle'
import { Keyboard } from './Keyboard'

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col pb-32 pt-24">
      <EmberField />

      <div className="relative z-10 flex h-full grow flex-col gap-8 sm:justify-center">
        <FadeIn delay={0}>
          <div className="flex w-fit items-center gap-3 rounded-full border border-accent-500/20 bg-accent-500/5 py-1.5 pl-3 pr-4 backdrop-blur-sm">
            <div className="relative size-3">
              <div className="absolute size-full animate-ping rounded-full bg-accent-400 opacity-20" />
              <div className="drop-shadow-accent size-full rounded-full bg-accent-400" />
            </div>
            <p className="text-sm text-zinc-300 max-xs:text-xs">
              Available for projects
            </p>
          </div>
        </FadeIn>

        <HeroTitle />

        <FadeIn delay={0.45}>
          <p className="mb-8 max-w-xl leading-relaxed text-zinc-400 max-sm:text-sm">
            I like working with ideas that move the needle, whether it&apos;s
            products, systems, or people. I care about craft, momentum, and
            doing the hard things well. Most days I&apos;m building, writing,
            or helping others figure out how to ship their vision.
          </p>
        </FadeIn>

        <FadeIn delay={0.6}>
          <Keyboard />
        </FadeIn>
      </div>
    </section>
  )
}
