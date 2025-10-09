import type { SVGProps } from 'react'

export function Medium(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 256 256'
      {...props}
    >
      <path
        fill='currentColor'
        d='M72 64a64 64 0 1 0 64 64a64.07 64.07 0 0 0-64-64m0 120a56 56 0 1 1 56-56a56.06 56.06 0 0 1-56 56m100-120a8 8 0 0 0-8 8v104a8 8 0 0 0 16 0V72a8 8 0 0 0-8-8m56 0a8 8 0 0 0-8 8v104a8 8 0 0 0 16 0V72a8 8 0 0 0-8-8'
      ></path>
    </svg>
  )
}

