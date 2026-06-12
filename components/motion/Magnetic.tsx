'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

/** Magnetic hover — the element is gently pulled toward the cursor. */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  const onMouseMove = (e: React.MouseEvent) => {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return
    x.set((e.clientX - bounds.left - bounds.width / 2) * strength)
    y.set((e.clientY - bounds.top - bounds.height / 2) * strength)
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}
