import { useEffect, useState } from 'react'

const NAMES = ['Taufeeq Riyaz', 'तौफीक रियाज़', 'ತೌಫೀಕ್ ರಿಯಾಜ್', 'తౌఫీక్ రియాజ్', 'توفیق ریاض']

export function AnimatedName() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % NAMES.length)
        setIsVisible(true)
      }, 300) // Half of transition duration
    }, 3000) // Change text every 3 seconds

    return () => clearInterval(interval as unknown as number)
  }, [])

  return (
    <span
      className='tracking-widest inline-block transition-opacity duration-500'
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {' '}
      {NAMES[currentIndex]}
      {' '}
    </span>
  )
}

