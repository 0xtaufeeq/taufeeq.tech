import type { Metadata } from 'next'
import { Construction } from 'lucide-react'

import { Reveal } from '@/components/motion/Reveal'
import { BackToHome } from '@/components/ui/BackToHome'

export const metadata: Metadata = {
  title: 'Under construction',
  description: 'This page is under construction',
  alternates: { canonical: '/bookmarks' }
}

export default function BookmarksPage() {
  return (
    <section className="mt-16 flex min-h-[480px] flex-col items-center justify-center text-center">
      <Reveal>
        <div className="mx-auto w-fit rounded-2xl border border-line bg-card p-3">
          <Construction className="size-16 text-ink" />
        </div>
        <h1 className="display mt-8 text-[clamp(2rem,5vw,4rem)] leading-none text-ink">
          Under Construction
        </h1>
        <p className="mt-4 leading-relaxed text-muted max-sm:text-sm">
          This page is currently under construction. I&apos;m working hard
          <br className="max-sm:hidden" />
          to bring something exciting here soon. Stay tuned!
        </p>
        <div className="mt-8">
          <BackToHome />
        </div>
      </Reveal>
    </section>
  )
}
