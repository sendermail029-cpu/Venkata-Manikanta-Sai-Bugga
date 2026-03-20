'use client'

import { useRef, useCallback } from 'react'

export function useTilt(intensity = 8) {
  const cardRef = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    card.style.transform = `
      perspective(900px)
      rotateY(${x * intensity}deg)
      rotateX(${-y * (intensity * 0.6)}deg)
      translateZ(6px)
    `
    card.style.transition = 'transform 0.1s ease-out'
  }, [intensity])

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)'
    card.style.transition = 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)'
  }, [])

  return { cardRef, onMouseMove, onMouseLeave }
}
