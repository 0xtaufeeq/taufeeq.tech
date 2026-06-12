import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export interface ProjectLink {
  name: string
  icon: string
  url: string
}

export interface ProjectEntry {
  slug: string
  title: string
  htmlTitle: string
  description: string
  year: number
  heroImage: string
  updatedDate?: string
  links: ProjectLink[]
  body: string
  readingMinutes: number
}

export interface BlogEntry {
  slug: string
  title: string
  description: string
  heroImage: string
  tags: string[]
  pubDate: string
  updatedDate?: string
  body: string
  readingMinutes: number
}

/** MDX files are rendered with next-mdx-remote: import statements aren't
 * supported there, so strip them and provide the components globally. */
const stripImports = (body: string) =>
  body.replace(/^import\s.+$/gm, '').trim()

const readDir = (dir: string) => {
  const full = path.join(CONTENT_DIR, dir)
  if (!fs.existsSync(full)) return []
  return fs.readdirSync(full).filter((f) => f.endsWith('.mdx'))
}

export function getProjects(): ProjectEntry[] {
  return readDir('projects')
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(
        path.join(CONTENT_DIR, 'projects', file),
        'utf-8'
      )
      const { data, content } = matter(raw)
      const body = stripImports(content)
      return {
        slug,
        title: data.title as string,
        htmlTitle: (data.htmlTitle as string) || (data.title as string),
        description: data.description as string,
        year: data.year as number,
        heroImage:
          typeof data.heroImage === 'string' &&
          data.heroImage.startsWith('../../assets/')
            ? '/images/devsphere-hero.png'
            : (data.heroImage as string),
        updatedDate: data.updatedDate ? String(data.updatedDate) : undefined,
        links: (data.links as ProjectLink[]) ?? [],
        body,
        readingMinutes: Math.ceil(readingTime(body).minutes)
      }
    })
    .sort((a, b) => b.year - a.year)
}

export function getProject(slug: string) {
  return getProjects().find((p) => p.slug === slug)
}

export function getBlogPosts(): BlogEntry[] {
  return readDir('blog')
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(CONTENT_DIR, 'blog', file), 'utf-8')
      const { data, content } = matter(raw)
      const body = stripImports(content)
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        heroImage: data.heroImage as string,
        tags: (data.tags as string[]) ?? [],
        pubDate: String(data.pubDate),
        updatedDate: data.updatedDate ? String(data.updatedDate) : undefined,
        body,
        readingMinutes: Math.ceil(readingTime(body).minutes)
      }
    })
    .sort((a, b) => +new Date(b.pubDate) - +new Date(a.pubDate))
}

export function getBlogPost(slug: string) {
  return getBlogPosts().find((p) => p.slug === slug)
}
