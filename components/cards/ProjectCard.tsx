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
      <div className="relative overflow-clip rounded-xl border border-line bg-card">
        <Image
          src={project.heroImage}
          alt={project.title}
          width={800}
          height={457}
          className="aspect-[1.75] w-full object-cover object-top transition-all duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="label">{project.year}</p>
        <h4 className="display text-2xl !leading-[1.2] text-ink max-sm:text-xl">
          {project.title}
        </h4>
        <p className="text-sm text-muted">{project.description}</p>
        <span className="w-fit text-sm text-accent">
          Read more
          <ArrowRight className="ml-1 inline-block size-4 transition-all duration-300 group-hover:ml-2" />
        </span>
      </div>
    </Link>
  )
}
