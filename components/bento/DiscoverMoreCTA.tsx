import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function DiscoverMoreCTA() {
  return (
    <Link
      href="/#projects"
      className="flex size-full items-center justify-between rounded-3xl px-6 py-6 text-zinc-100"
    >
      <p className="relative font-medium after:absolute after:left-0 after:top-1/2 after:mt-3 after:h-0.5 after:w-0 after:bg-primary-gradient after:transition-all after:duration-[400ms] after:content-[''] group-hover:after:w-full">
        Discover more projects
      </p>
      <ArrowRight className="size-6 transition-all duration-300 group-hover:rotate-90" />
    </Link>
  )
}
