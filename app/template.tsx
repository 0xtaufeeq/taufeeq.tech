'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Continuous-glide page transition: no overlay, nothing that feels like
 * loading — new content is staged below and glides up with an expo ease.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 90 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
