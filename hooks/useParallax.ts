'use client'

import { useEffect, useState, useRef } from 'react'

export function useParallax(speed: number = 0.3) {
  const ref   = useRef<HTMLDivElement>(null)
  const [y, setY] = useState(0)

  useEffect(() => {
    function onScroll() {
      const el = ref.current
      if (!el) return
      const rect   = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2 - window.innerHeight / 2
      setY(center * speed)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return { ref, y }
}
