import type { Metadata } from 'next'
import JourneySection from '@/components/sections/JourneySection'
import Footer from '@/components/layout/Footer'
import { personal } from '@/data'

export const metadata: Metadata = {
  title: `Journey — ${personal.name}`,
  description: `Follow ${personal.name}'s career path, milestones, and experience timeline.`,
}

export default function JourneyPage() {
  return (
    <>
      <main className="pt-24">
        <JourneySection />
      </main>
      <Footer />
    </>
  )
}
