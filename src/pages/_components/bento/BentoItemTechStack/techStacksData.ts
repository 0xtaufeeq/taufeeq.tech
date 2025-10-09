import { Figma } from '@icons/Figma'
import { GCP } from '@icons/GCP'
import { Git } from '@icons/Git'
import { Github } from '@icons/Github'
import { JavaScript } from '@icons/JavaScript'
import { NextJs } from '@icons/NextJs'
import { Python } from '@icons/Python'
import { ReactJs } from '@icons/ReactJs'
import { Vercel } from '@icons/Vercel'
import type { JSX, SVGProps } from 'react'

type TechStack = {
  name: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  description: string
}

const techStacks: TechStack[] = [
  {
    name: 'Next.js',
    icon: NextJs,
    description: 'The React Framework for Production'
  },
  {
    name: 'React',
    icon: ReactJs,
    description: 'A JavaScript library for building user interfaces'
  },
  {
    name: 'GCP',
    icon: GCP,
    description: 'Google Cloud Platform'
  },
  {
    name: 'Vercel',
    icon: Vercel,
    description: 'Platform for frontend frameworks and static sites'
  },
  {
    name: 'Git',
    icon: Git,
    description: 'Distributed version control system'
  },
  {
    name: 'GitHub',
    icon: Github,
    description: 'Development platform for collaboration'
  },
  {
    name: 'JavaScript',
    icon: JavaScript,
    description: 'The programming language of the web'
  },
  {
    name: 'Python',
    icon: Python,
    description: 'A versatile programming language'
  },
  {
    name: 'Figma',
    icon: Figma,
    description: 'Collaborative interface design tool'
  }
]

export default techStacks
