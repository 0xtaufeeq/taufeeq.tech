import type { Metadata } from 'next'
import { Briefcase } from 'lucide-react'

import { ProjectCard } from '@/components/cards/ProjectCard'
import { Reveal } from '@/components/motion/Reveal'
import { BackToHome } from '@/components/ui/BackToHome'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getProjects } from '@/lib/content'
import { PROJECT_META } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Projects',
  description: PROJECT_META.description
}

export default function ProjectsPage() {
  const projects = getProjects()

  return (
    <>
      <div className="mt-16 items-center justify-between gap-4 sm:mt-40 lg:flex">
        <SectionHeader
          badge={<Briefcase className="size-4" />}
          section="Projects"
          title={PROJECT_META.title}
          description={PROJECT_META.description}
        />
        <BackToHome className="max-lg:hidden" />
      </div>
      <section className="mt-12 grid gap-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </section>
    </>
  )
}
