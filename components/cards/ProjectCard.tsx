import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import type { ProjectEntry } from '@/lib/content'

export function ProjectCard({
  project
}: {
  project: Pick<
    ProjectEntry,
    'slug' | 'title' | 'description' | 'year' | 'heroImage'
  >
}) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block space-y-6">
      <div className="relative overflow-clip rounded-lg border border-zinc-900">
        <Image
          src={project.heroImage}
          alt={project.title}
          width={800}
          height={457}
          className="aspect-[1.75] w-full object-cover object-top transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-mono text-sm text-accent-400">{project.year}</p>
        <h4 className="font-display text-xl font-semibold !leading-[1.25] text-zinc-100 max-sm:text-lg">
          {project.title}
        </h4>
        <p className="text-sm text-zinc-400">{project.description}</p>
        <span className="w-fit text-sm text-accent-400">
          Read more
          <ArrowRight className="ml-1 inline-block size-4 transition-all duration-300 group-hover:ml-2" />
        </span>
      </div>
    </Link>
  )
}
