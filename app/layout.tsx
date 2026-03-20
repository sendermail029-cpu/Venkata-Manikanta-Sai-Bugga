import type { Metadata } from 'next'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { LenisProvider } from '@/providers/LenisProvider'
import CursorGlow from '@/components/ui/CursorGlow'
import NoiseOverlay from '@/components/ui/NoiseOverlay'
import PageTransition from '@/components/ui/PageTransition'
import Nav from '@/components/layout/Nav'
import { personal } from '@/data'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${personal.name} — Portfolio`,
  description: 'Portfolio of Venkata Manikanta Sai Bugga featuring projects, tools, and technical work.',
  keywords: [
    'Venkata Manikanta Sai Bugga',
    'Portfolio',
    'Data Analysis',
    'Cloud Computing',
    'Artificial Intelligence',
    'Backend Development',
  ],
  icons: {
    icon: '/vbv.svg',
    shortcut: '/vbv.svg',
    apple: '/vbv.svg',
  },
  openGraph: {
    title: `${personal.name} — Portfolio`,
    description: 'Portfolio of Venkata Manikanta Sai Bugga featuring projects, tools, and technical work.',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>
          <LenisProvider>
            <NoiseOverlay />
            <CursorGlow />
            <Nav />
            <PageTransition>{children}</PageTransition>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
