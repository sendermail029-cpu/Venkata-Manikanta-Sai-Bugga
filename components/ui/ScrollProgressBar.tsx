'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function ScrollProgressBar() {
  const progress = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[200] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[var(--gold)] via-[var(--gold-pale)] to-[var(--gold)]"
        style={{
          width: `${progress * 100}%`,
          transition: 'width 0.1s linear',
          boxShadow: '0 0 8px var(--gold-glow)',
        }}
      />
    </div>
  )
}
