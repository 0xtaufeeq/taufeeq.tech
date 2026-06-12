import type { MetadataRoute } from 'next'

import { getBlogPosts, getProjects } from '@/lib/content'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages get no lastModified: a fabricated "always fresh" date
  // teaches crawlers to distrust the real dates on posts and projects.
  const staticPages = [
    '',
    '/about',
    '/values',
    '/projects',
    '/blog',
    '/tools',
    '/tools/markdown-editor',
    '/tools/regex-tester',
    '/nohello',
    '/bookmarks'
  ].map((path) => ({
    url: `${SITE.url}${path}`
  }))

  const projects = getProjects().map(({ slug, updatedDate }) => ({
    url: `${SITE.url}/projects/${slug}`,
    ...(updatedDate && { lastModified: new Date(updatedDate) })
  }))

  const posts = getBlogPosts().map(({ slug, updatedDate, pubDate }) => ({
    url: `${SITE.url}/blog/${slug}`,
    lastModified: new Date(updatedDate ?? pubDate)
  }))

  return [...staticPages, ...projects, ...posts]
}
