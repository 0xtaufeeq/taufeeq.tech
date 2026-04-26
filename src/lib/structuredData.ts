import type { CollectionEntry } from 'astro:content'
import type { Article, BreadcrumbList, Organization, Person, ProfilePage, WebPage, WebSite, WithContext } from 'schema-dts'

import { projectMetaData } from './metaData'

export const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Taufeeq Riyaz',
  url: import.meta.env.SITE,
  logo: `${import.meta.env.SITE}/images/og_main.png`,
  sameAs: [
    'https://x.com/0xtaufeeq',
    'https://github.com/0xtaufeeq',
    'https://www.linkedin.com/in/taufeeq'
  ],
  founder: {
    '@type': 'Person',
    name: 'Taufeeq Riyaz'
  }
}

export const mainWebsite: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: import.meta.env.SITE,
  name: 'Taufeeq Riyaz - Entrepreneur & Software Engineer',
  description:
    'Technology entrepreneur, founder of Tenacity & DevSphere. Building educational platforms & fostering innovation in AI, blockchain & web development.',
  inLanguage: 'en_US',
  publisher: organizationSchema,
  author: {
    '@type': 'Person',
    '@id': `${import.meta.env.SITE}/#taufeeq-riyaz`,
    name: 'Taufeeq Riyaz'
  }
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
  '@id': `${import.meta.env.SITE}/#taufeeq-riyaz`,
  name: 'Taufeeq Riyaz',
  url: import.meta.env.SITE,
  image: 'https://avatars.githubusercontent.com/u/74425589',
  description:
    'Technology entrepreneur and developer advocate. Founder of Tenacity - a community platform that has run 150+ events with 50+ industry brands. Infosys Springboard 20Under20 (2024). B.Tech CSE at RV University, Bengaluru.',
  sameAs: [
    'https://www.linkedin.com/in/taufeeq',
    'https://github.com/0xtaufeeq',
    'https://taufeeqriyaz.medium.com',
    'https://www.crunchbase.com/person/taufeeq-riyaz',
    'https://www.instagram.com/0xtaufeeq',
    'https://www.figma.com/@taufeeq'
  ],
  jobTitle: 'Founder & Developer Advocate',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    addressCountry: 'IN'
  },
  award: 'Infosys Springboard 20Under20 - Entrepreneurship Category, 2024',
  worksFor: {
    '@type': 'Organization',
    name: 'Tenacity',
    url: 'https://tenacityhq.vercel.app',
  },
  knowsAbout: [
    'Artificial Intelligence',
    'Blockchain',
    'Web3',
    'Developer Communities',
    'Full-Stack Development',
    'Cloud Computing'
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'RV University',
    url: 'https://rvu.edu.in'
  }
}

export const profilePageSchema: WithContext<ProfilePage> = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: personSchema,
  dateCreated: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0]
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function getProjectSchema(post: CollectionEntry<'projects'>) {
  const articleStructuredData: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.data.title,
    url: `${import.meta.env.SITE}/projects/${post.id}/`,
    image: {
      '@type': 'ImageObject',
      url: `${import.meta.env.SITE}${post.data.heroImage.src}`,
      width: '1200',
      height: '630'
    },
    description: post.data.description,
    datePublished: post.data.updatedDate?.toISOString() || new Date().toISOString(),
    dateModified: post.data.updatedDate?.toISOString() || new Date().toISOString(),
    publisher: organizationSchema,
    author: personSchema,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${import.meta.env.SITE}/projects/${post.id}/`
    }
  }
  return articleStructuredData
}

export function getWebPageSchema(title: string, description: string, url: string): WithContext<WebPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
    inLanguage: 'en_US',
    publisher: organizationSchema,
    author: personSchema
  }
}
