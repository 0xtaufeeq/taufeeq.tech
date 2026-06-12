import { EXTRA_SOCIALS, SITE, SKILLS, SOCIALS } from '@/lib/site'

import type { BlogEntry, ProjectEntry } from './content'

const PERSON_ID = `${SITE.url}/#person`
const WEBSITE_ID = `${SITE.url}/#website`

const sameAs = [
  ...SOCIALS.filter((s) => s.href.startsWith('https')).map((s) => s.href),
  ...EXTRA_SOCIALS.map((s) => s.href),
  'https://www.crunchbase.com/person/taufeeq-riyaz'
]

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  email: `mailto:${SITE.email}`,
  jobTitle: 'Founder',
  sameAs,
  knowsAbout: SKILLS,
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'RV University',
    sameAs: 'https://rvu.edu.in'
  },
  award: '20Under20 by Infosys Springboard (2024, Entrepreneurship)',
  worksFor: [
    { '@type': 'Organization', name: 'Tenacity' },
    { '@type': 'Organization', name: 'DevSphere' }
  ]
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE.url,
  name: SITE.title,
  description: SITE.description,
  publisher: { '@id': PERSON_ID },
  inLanguage: 'en'
}

export const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: `${SITE.url}/about`,
  name: `About ${SITE.name}`,
  isPartOf: { '@id': WEBSITE_ID },
  mainEntity: { '@id': PERSON_ID }
}

const breadcrumbJsonLd = (crumbs: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: crumb.name,
    item: `${SITE.url}${crumb.path}`
  }))
})

export const blogPostJsonLd = (post: BlogEntry) => {
  const url = `${SITE.url}/blog/${post.slug}`
  const published = new Date(post.pubDate).toISOString()
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: url,
      url,
      headline: post.title,
      description: post.description,
      image: post.heroImage.startsWith('/')
        ? `${SITE.url}${post.heroImage}`
        : post.heroImage,
      datePublished: published,
      dateModified: post.updatedDate
        ? new Date(post.updatedDate).toISOString()
        : published,
      keywords: post.tags.join(', '),
      inLanguage: 'en',
      isPartOf: { '@id': WEBSITE_ID },
      author: { '@id': PERSON_ID },
      publisher: { '@id': PERSON_ID }
    },
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` }
    ])
  ]
}

export const projectJsonLd = (project: ProjectEntry) => {
  const url = `${SITE.url}/projects/${project.slug}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      mainEntityOfPage: url,
      url,
      name: project.title,
      description: project.description,
      image: project.heroImage.startsWith('/')
        ? `${SITE.url}${project.heroImage}`
        : project.heroImage,
      ...(project.updatedDate && {
        dateModified: new Date(project.updatedDate).toISOString()
      }),
      copyrightYear: project.year,
      inLanguage: 'en',
      isPartOf: { '@id': WEBSITE_ID },
      author: { '@id': PERSON_ID }
    },
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: project.title, path: `/projects/${project.slug}` }
    ])
  ]
}
