import type { SVGProps } from 'react'

export function Cpp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 48 48'
      {...props}
    >
      <defs>
        <mask id='cpp-cut' maskUnits='userSpaceOnUse' x='0' y='0' width='48' height='48'>
          {/* base visible shapes */}
          <path fill='#ffffff' fillRule='evenodd' d='M22.903,3.286c0.679-0.381,1.515-0.381,2.193,0 c3.355,1.883,13.451,7.551,16.807,9.434C42.582,13.1,43,13.804,43,14.566c0,3.766,0,15.101,0,18.867 c0,0.762-0.418,1.466-1.097,1.847c-3.355,1.883-13.451,7.551-16.807,9.434c-0.679,0.381-1.515,0.381-2.193,0 c-3.355-1.883-13.451-7.551-16.807-9.434C5.418,34.899,5,34.196,5,33.434c0-3.766,0-15.101,0-18.867 c0-0.762,0.418-1.466,1.097-1.847C9.451,10.837,19.549,5.169,22.903,3.286z' clipRule='evenodd'></path>
          <path fill='#ffffff' fillRule='evenodd' d='M5.304,34.404C5.038,34.048,5,33.71,5,33.255 c0-3.744,0-15.014,0-18.759c0-0.758,0.417-1.458,1.094-1.836c3.343-1.872,13.405-7.507,16.748-9.38 c0.677-0.379,1.594-0.371,2.271,0.008c3.343,1.872,13.371,7.459,16.714,9.331c0.27,0.152,0.476,0.335,0.66,0.576L5.304,34.404z' clipRule='evenodd'></path>
          <path fill='#ffffff' fillRule='evenodd' d='M42.485,13.205c0.516,0.483,0.506,1.211,0.506,1.784 c0,3.795-0.032,14.589,0.009,18.384c0.004,0.396-0.127,0.813-0.323,1.127L23.593,24L42.485,13.205z' clipRule='evenodd'></path>
          {/* holes: inner circle and plus signs */}
          <circle cx='24' cy='24' r='7' fill='#000000'></circle>
          <rect x='31' y='21' width='2' height='6' fill='#000000'></rect>
          <rect x='29' y='23' width='6' height='2' fill='#000000'></rect>
          <rect x='38' y='21' width='2' height='6' fill='#000000'></rect>
          <rect x='36' y='23' width='6' height='2' fill='#000000'></rect>
        </mask>
      </defs>
      <rect width='48' height='48' fill='#ffffff' mask='url(#cpp-cut)'></rect>
    </svg>
  )
}

