'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const NAME = 'Taufeeq Riyaz'
const HANDLE = '@0xtaufeeq'

/** Hover-swap between the name and the handle, letter by letter. */
export function AnimatedName() {
  const [hovered, setHovered] = useState(false)
  const text = hovered ? HANDLE : NAME

  return (
    <span
      className="relative inline-flex cursor-default overflow-hidden font-medium"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
