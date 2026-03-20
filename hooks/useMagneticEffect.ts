'use client'

import { useRef, useState, useCallback } from 'react'

export function useMagneticEffect(strength: number = 0.35) {
  const ref = useRef<HTMLElement>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0 })

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx   = rect.left + rect.width  / 2
      const cy   = rect.top  + rect.height / 2
      setTransform({
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
      })
    },
    [strength]
  )

  const onMouseLeave = useCallback(() => setTransform({ x: 0, y: 0 }), [])

  const style = {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
    transition: transform.x === 0 && transform.y === 0
      ? 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
      : 'transform 0.1s ease-out',
  }

  return { ref, onMouseMove, onMouseLeave, style }
}
