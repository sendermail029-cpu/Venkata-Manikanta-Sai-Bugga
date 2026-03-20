'use client'

import { useRef, useState } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number
  children: React.ReactNode
  className?: string
  as?: 'button' | 'div'
}

export default function MagneticButton({
  strength = 0.4,
  children,
  className = '',
  as: Tag = 'button',
  ...props
}: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    setOffset({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    })
  }

  const onLeave = () =>
    setOffset({ x: 0, y: 0 })

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: offset.x === 0 && offset.y === 0
          ? 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
          : 'transform 0.15s ease-out',
        ...((props as any).style ?? {}),
      }}
      {...props}
    >
      {children}
    </button>
  )
}
