'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'lottie-react'
import loadingAnimation from '@/public/loading.json'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const pendingNavigationRef = useRef(false)

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a[href]') as HTMLAnchorElement | null
      if (!anchor) return
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return

      const nextPath = `${url.pathname}${url.search}${url.hash}`
      const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`
      if (nextPath === currentPath) return

      pendingNavigationRef.current = true
      setVisible(true)
    }

    document.addEventListener('click', handleDocumentClick, true)
    return () => document.removeEventListener('click', handleDocumentClick, true)
  }, [])

  useEffect(() => {
    if (!pendingNavigationRef.current) return
    setVisible(true)
  }, [pathname])

  function handleAnimationComplete() {
    setVisible(false)
    pendingNavigationRef.current = false
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {visible ? (
          <motion.div
            key={`page-loader-${pathname}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto fixed inset-0 z-[140] flex items-center justify-center bg-[var(--bg)]/92 backdrop-blur-[8px]"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center gap-2">
                <span className="h-3 w-3 animate-pulse rounded-full bg-[var(--gold)]/90 [animation-delay:0ms]" />
                <span className="h-3 w-3 animate-pulse rounded-full bg-[var(--gold)]/70 [animation-delay:120ms]" />
                <span className="h-3 w-3 animate-pulse rounded-full bg-[var(--gold)]/50 [animation-delay:240ms]" />
              </div>
              <div className="relative w-[150px] max-w-[38vw] sm:w-[190px]">
                <Lottie animationData={loadingAnimation} loop={false} autoplay onComplete={handleAnimationComplete} />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {children}
    </>
  )
}
