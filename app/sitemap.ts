import type { MetadataRoute } from 'next'

import { getBlogPosts, getProjects } from '@/lib/content'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
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
    url: `${SITE.url}${path}`,
    lastModified: new Date()
  }))

  const projects = getProjects().map(({ slug, updatedDate }) => ({
    url: `${SITE.url}/projects/${slug}`,
    lastModified: updatedDate ? new Date(updatedDate) : new Date()
  }))

  const posts = getBlogPosts().map(({ slug, updatedDate, pubDate }) => ({
    url: `${SITE.url}/blog/${slug}`,
    lastModified: new Date(updatedDate ?? pubDate)
  }))

  return [...staticPages, ...projects, ...posts]
}
