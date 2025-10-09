import type { CollectionEntry } from 'astro:content'
import type { Article, Person, WebSite, WithContext } from 'schema-dts'

import { projectMetaData } from './metaData'

export const mainWebsite: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: import.meta.env.SITE,
  name: 'Taufeeq Riyaz - Personal Website',
  description:
    'From Figma to TypeScript, I craft seamless web and mobile experiences as a software engineer, based in Jakarta, Indonesia.',
  inLanguage: 'en_US'
}

export const projectWebsite: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: `${import.meta.env.SITE}/projects/`,
  name: 'Projects',
  description: projectMetaData.description,
  inLanguage: 'en_US'
}

export const personSchema: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Taufeeq Riyaz',
  url: 'https://taufeeq.tech',
  // image: `${import.meta.env.SITE}${avatar.src}`,
  sameAs: [
    'https://x.com/0xtaufeeq',
    'https://github.com/0xtaufeeq',
    'https://www.linkedin.com/in/taufeeq'
  ],
  jobTitle: 'Founder',
  worksFor: {
    '@type': 'Organization',
    name: 'Tenacity',
    url: 'https://taufeeq.tech',
  },
}

export function getProjectSchema(post: CollectionEntry<'projects'>) {
  const articleStructuredData: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.data.title,
    url: `${import.meta.env.SITE}/projects/${post.id}/`,
    image: {
      '@type': 'ImageObject',
      url: `${import.meta.env.SITE}${post.data.heroImage.src}/`
    },
    description: post.data.description,
    // datePublished
    publisher: personSchema,
    author: personSchema
  }
  return articleStructuredData
}
