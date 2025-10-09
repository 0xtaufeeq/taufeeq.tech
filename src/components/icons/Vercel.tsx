import type { SVGProps } from 'react'

export function Vercel(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path d='M12 1L24 22H0L12 1Z' fill='#ffffff'></path>
    </svg>
  )
}

