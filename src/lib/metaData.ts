import { z } from 'astro/zod'

const LINE_BREAK = {
  '{n}': ' <br /> ',
  '{nSm}': " <br class='max-sm:hidden'/> ",
  '{nMd}': " <br class='max-md:hidden'/> ",
  '{nLg}': " <br class='max-lg:hidden'/> "
}

interface ParseTextOptions {
  isCleanText?: boolean
}

const parseText = (text: string, opts?: ParseTextOptions): string => {
  let newText = text
  Object.keys(LINE_BREAK).forEach((key) => {
    newText = newText.replaceAll(
      key,
      opts?.isCleanText ? ' ' : LINE_BREAK[key as keyof typeof LINE_BREAK]
    )
  })
  return newText
}

const metaDataSchema = z
  .object({ title: z.string(), description: z.string() })
  .transform((value) => ({
    title: parseText(value.title, { isCleanText: true }),
    htmlTitle: parseText(value.title),
    description: parseText(value.description, { isCleanText: true }),
    htmlDescription: parseText(value.description)
  }))

type MetaData = z.output<typeof metaDataSchema>
type MetaDataInput = z.input<typeof metaDataSchema>

const _mainMetaData: MetaDataInput = {
  title: 'Taufeeq Riyaz',
  description:
    'Taufeeq Riyaz is a technology entrepreneur and developer advocate recognized for building transformative educational platforms and fostering innovation communities across India. As Founder of Tenacity, he has created a community-driven learning platform that has delivered over 150 educational events, workshops, and hackathons in collaboration with more than 50 industry brands since January 2023. He earned recognition in the prestigious "20Under20" list by Infosys Springboard under the entrepreneurship category in 2024 for his work with Tenacity, positioning him among India\'s most promising young technology leaders. Currently pursuing B.Tech Honours in Computer Science and Engineering at RV University, he serves as a Research Associate at the Centre for Global Education and maintains his role as a peer mentor while advancing cutting-edge research in artificial intelligence and blockchain technologies. Building on Tenacity\'s success, Riyaz founded DevSphere in January 2024, focusing specifically on blockchain and open-source education for RV University students. As Founder and President, he has orchestrated specialized boot camps, workshops, and hackathons that bridge theoretical knowledge with practical application in emerging technologies. His technical expertise spans full-stack web development, artificial intelligence, and blockchain technologies. His early academic excellence includes multiple Science Olympiad gold medals in NSO and IMO competitions. Through his leadership of both Tenacity and DevSphere, Riyaz has demonstrated the ability to scale, forge strategic industry partnerships, and maintain unwavering focus on creating value for thousands of people. His commitment to educational equity is reflected in maintaining both platforms as free, open-source, not-for-profit resources. Taufeeq Riyaz combines technical proficiency with visionary leadership, consistently identifying emerging technology trends and translating them into accessible learning experiences. His work centers on creating meaningful ecosystems that empower developers to leverage cutting-edge technologies including AI effectively.'
}
export const mainMetaData = metaDataSchema.parse(_mainMetaData)

const _projectMetaData: MetaDataInput = {
  title: 'Milestones in the{n}learning journey',
  description:
    'Each project marks a step forward, showcasing my growth and journey as a developer.{nMd}Explore how I’ve tackled challenges and built solutions along the way.'
}
export const projectMetaData: MetaData = metaDataSchema.parse(_projectMetaData)

const _blogMetaData: MetaDataInput = {
  title: 'Learning, Building, and{nSm}Documenting',
  description:
    'Insights and experiences from my journey as a developer—exploring ideas,{nSm}overcoming challenges, and sharing lessons learned along the way.'
}
export const blogMetaData: MetaData = metaDataSchema.parse(_blogMetaData)
