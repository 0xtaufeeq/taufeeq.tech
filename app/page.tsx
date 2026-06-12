import { Briefcase, Pencil } from 'lucide-react'

import { BentoSection } from '@/components/bento/BentoSection'
import { BlogCard } from '@/components/cards/BlogCard'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { Hero } from '@/components/home/Hero'
import { Philosophy } from '@/components/home/Philosophy'
import { VelocityMarquee } from '@/components/home/VelocityMarquee'
import { Reveal } from '@/components/motion/Reveal'
import { FancyLink } from '@/components/ui/FancyLink'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getBlogPosts, getProjects } from '@/lib/content'
import { BLOG_META, PROJECT_META } from '@/lib/site'

export default function HomePage() {
  const projects = getProjects()
  const posts = getBlogPosts()

  return (
    <>
      <Hero />
      <VelocityMarquee />

      <div className="mt-24">
        <BentoSection />
      </div>

      <Philosophy />

      <section id="projects" className="mt-40 scroll-mt-16">
        <div className="items-center justify-between gap-4 lg:flex">
          <SectionHeader
            forHomePage
            badge={<Briefcase className="size-4" />}
            section="Projects"
            title={PROJECT_META.title}
            description={PROJECT_META.description}
          />
          <FancyLink className="max-lg:hidden" href="/projects">
            View all projects
          </FancyLink>
        </div>
        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="blog" className="mt-40 scroll-mt-16">
        <div className="items-center justify-between gap-4 lg:flex">
          <SectionHeader
            forHomePage
            badge={<Pencil className="size-4" />}
            section="Blog"
            title={BLOG_META.title}
            description={BLOG_META.description}
          />
          <FancyLink className="max-lg:hidden" href="/blog">
            View all articles
          </FancyLink>
        </div>
        <div className="mt-12">
          {posts.map((post) => (
            <Reveal key={post.slug}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
