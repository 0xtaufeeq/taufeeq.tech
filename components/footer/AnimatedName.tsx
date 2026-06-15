'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/** The name in several languages — cycled with a smooth blur/slide swap. */
const NAMES = [
  'Taufeeq Riyaz', // English
  'ತೌಫೀಕ್ ರಿಯಾಜ್', // Kannada
  'తౌఫీఖ్ రియాజ్', // Telugu
  'توفيق رياز', // Arabic
  'तौफ़ीक़ रियाज़' // Hindi
]

/** Cycles the name through different languages with a smooth animated swap. */
export function AnimatedName() {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % NAMES.length)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  const name = NAMES[index]

  return (
    <span className="relative inline-flex font-medium" dir="auto">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={name + index}
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 10, filter: 'blur(6px)' }
          }
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -10, filter: 'blur(6px)' }
          }
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {name}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
