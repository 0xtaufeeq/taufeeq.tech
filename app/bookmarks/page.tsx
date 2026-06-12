import type { Metadata } from 'next'
import { Construction } from 'lucide-react'

import { Reveal } from '@/components/motion/Reveal'
import { BackToHome } from '@/components/ui/BackToHome'

export const metadata: Metadata = {
  title: 'Under construction',
  description: 'This page is under construction'
}

export default function BookmarksPage() {
  return (
    <section className="mt-16 flex min-h-[480px] flex-col items-center justify-center text-center">
      <Reveal>
        <div className="mx-auto w-fit rounded-2xl border-2 border-zinc-800 bg-gradient-to-b from-zinc-700 to-zinc-900 p-3">
          <Construction className="size-16 text-zinc-100" />
        </div>
        <h1 className="mt-8 text-[clamp(2rem,5vw,4rem)] font-semibold leading-none tracking-tight text-zinc-100">
          Under Construction
        </h1>
        <p className="mt-4 leading-relaxed text-zinc-400 max-sm:text-sm">
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
