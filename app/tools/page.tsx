import type { Metadata } from 'next'
import SkillsSection from '@/components/sections/SkillsSection'
import Footer from '@/components/layout/Footer'
import { personal } from '@/data'

export const metadata: Metadata = {
  title: `Tools — ${personal.name}`,
  description: `Explore the tools, technologies, and development strengths used by ${personal.name}.`,
}

export default function ToolsPage() {
  return (
    <>
      <main className="pt-24">
        <SkillsSection />
      </main>
      <Footer />
    </>
  )
}
