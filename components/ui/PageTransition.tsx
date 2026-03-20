'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'lottie-react'
import loadingAnimation from '@/public/lottie/loading.json'

const INITIAL_LOADER_MS = 420
const NAVIGATION_LOADER_MS = 320

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const mountedRef = useRef(false)
  const pendingNavigationRef = useRef(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      setVisible(false)
      mountedRef.current = true
    }, INITIAL_LOADER_MS)

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!mountedRef.current || !pendingNavigationRef.current) return

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setVisible(false)
      pendingNavigationRef.current = false
    }, NAVIGATION_LOADER_MS)

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [pathname])

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

  return (
    <>
      <AnimatePresence>
        {visible ? (
          <motion.div
            key={`page-loader-${pathname}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto fixed inset-0 z-[140] flex items-center justify-center bg-[var(--bg)]/88 backdrop-blur-[6px]"
          >
            <div className="w-[132px] max-w-[34vw] sm:w-[168px]">
              <Lottie animationData={loadingAnimation} loop autoplay />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {children}
    </>
  )
}
