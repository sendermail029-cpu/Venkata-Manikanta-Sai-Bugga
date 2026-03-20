'use client'

import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import celAnimation from '@/public/cel.json'

export default function Footer() {
  const [playBurst, setPlayBurst] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    if (!playBurst) return

    const timeout = window.setTimeout(() => {
      setPlayBurst(false)
    }, 3200)

    return () => window.clearTimeout(timeout)
  }, [playBurst])

  function triggerBurst() {
    setAnimationKey((current) => current + 1)
    setPlayBurst(true)
  }

  return (
    <footer className="relative bg-[var(--bg)] py-8">
      {playBurst ? (
        <div className="pointer-events-none fixed inset-0 z-[120] overflow-hidden">
          <Lottie
            key={animationKey}
            animationData={celAnimation}
            loop={false}
            autoplay
            className="h-full w-full scale-[1.08]"
          />
        </div>
      ) : null}

      <div className="container-main">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-[1.02rem] text-[var(--text2)]">
            Made with Next JS and Tailwind{' '}
            <button
              type="button"
              onClick={triggerBurst}
              aria-label="Play celebration animation"
              className="inline-block text-[#e53935] transition-transform duration-200 hover:scale-110"
            >
              {'\u2764'}
            </button>
          </div>
          <div className="mt-2 text-[0.98rem] text-[var(--text3)]">© 2025 Venkata Manikanta Sai Bugga</div>
        </div>
      </div>
    </footer>
  )
}
