import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import ToolLogo from '@/components/ui/ToolLogo'
import { personal, projects } from '@/data'

export const metadata = {
  title: `Projects - ${personal.name}`,
  description: `Explore selected analytics, research, cloud, and technical strategy projects by ${personal.name}.`,
}

function PreviewArtwork({
  slug,
  accentColor,
}: {
  slug: string
  accentColor: string
}) {
  if (slug === 'analysis-of-us-crime-statistics-2018') {
    return (
      <div
        className="relative h-full overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f4efe8 0%, #f8f4ed 100%)' }}
      >
        <div className="absolute inset-0 opacity-70">
          <div className="absolute left-5 top-5 h-24 w-24 rounded-[22px] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]" />
          <div className="absolute right-6 top-5 h-20 w-28 rounded-[22px] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]" />
          <div className="absolute left-5 top-32 h-24 w-36 rounded-[22px] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]" />
          <div className="absolute right-10 top-28 h-28 w-32 rounded-[24px] rotate-[-14deg] bg-[#ead29d] shadow-[0_20px_50px_rgba(15,23,42,0.12)]" />
          <div className="absolute bottom-6 left-6 h-16 w-16 rounded-full bg-[var(--gold-soft)]" />
          <div className="absolute bottom-6 left-28 h-20 w-20 rounded-[18px] bg-[#79c285]" />
          <div className="absolute bottom-7 right-8 h-24 w-24 rounded-[20px] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]" />
        </div>
        <div className="absolute left-6 top-6 text-[0.52rem] font-700 uppercase tracking-[0.18em] text-slate-500">
          Analytics Dashboard
        </div>
      </div>
    )
  }

  if (slug === 'blockchain-technologys-development-report') {
    return (
      <div
        className="relative h-full overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f4b56b 0%, #88c6b6 100%)' }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-[28px] border-4 border-[#64d56f] bg-[#0d0d0d] shadow-[0_22px_60px_rgba(15,23,42,0.35)]">
          <div className="grid h-full grid-cols-6 gap-1 p-3">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="rounded-full border border-[#49b954] bg-transparent" />
            ))}
          </div>
        </div>
        <div className="absolute bottom-6 right-6 h-12 w-12 rounded-full bg-white/70 blur-sm" />
      </div>
    )
  }

  if (slug === 'digital-transformation-of-reliance-industries') {
    return (
      <div
        className="relative h-full overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ece7ff 0%, #fff2bb 100%)' }}
      >
        <div className="absolute left-6 top-12 h-28 w-24 rounded-[26px] bg-[#efe8ff] shadow-[0_18px_40px_rgba(15,23,42,0.08)]" />
        <div className="absolute left-24 top-7 h-36 w-28 rounded-[28px] bg-[#ffe06b] shadow-[0_18px_40px_rgba(15,23,42,0.1)]" />
        <div className="absolute left-44 top-4 h-36 w-28 rounded-[28px] bg-[#23283a] shadow-[0_18px_40px_rgba(15,23,42,0.16)]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(${accentColor}20 1px, transparent 1px), linear-gradient(90deg, ${accentColor}20 1px, transparent 1px)`,
            backgroundSize: '26px 26px',
          }}
        />
      </div>
    )
  }

  return (
    <div
      className="relative h-full overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #4f72e9 0%, #2742b6 100%)' }}
    >
      <div className="absolute left-1/2 top-1/2 h-[120px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-[10px] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.2)]">
        <div className="h-5 rounded-t-[10px] bg-slate-100" />
        <div className="px-6 pt-6">
          <div className="mb-3 h-2 w-14 rounded-full bg-[#4f72e9]/70" />
          <div className="mb-3 h-8 rounded-full border border-slate-200" />
          <div className="mb-4 h-8 rounded-full border border-slate-200" />
          <div className="mx-auto h-3 w-20 rounded-full bg-[#4f72e9]" />
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(255,255,255,0.06)_100%)]" />
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <>
      <main className="pb-20 pt-28 sm:pb-24 sm:pt-32">
        <div className="container-main">
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-8">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`}>
                <div
                  className="group relative h-full cursor-pointer overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(15,23,42,0.12)] sm:rounded-[32px]"
                  style={{ transitionTimingFunction: 'var(--ease-premium)' }}
                >
                  <div className="relative h-52 overflow-hidden sm:h-56">
                    <PreviewArtwork slug={project.slug} accentColor={project.accentColor} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/25 to-transparent" />
                    <div
                      className="absolute right-4 top-4 rounded-full border px-3 py-1 text-[0.56rem] font-700 uppercase tracking-[0.15em] sm:right-5 sm:top-5 sm:text-[0.6rem]"
                      style={{
                        color: project.accentColor,
                        borderColor: `${project.accentColor}35`,
                        background: `${project.accentColor}0a`,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      {project.category}
                    </div>
                    <div
                      className="absolute bottom-4 left-4 text-[3.2rem] font-900 leading-none opacity-[0.08] sm:bottom-5 sm:left-5 sm:text-[4rem]"
                      style={{ color: project.accentColor, fontFamily: 'var(--font-display)' }}
                    >
                      {project.num}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 md:p-8">
                    <div className="mb-4 flex items-center justify-between gap-3 sm:gap-4">
                      <div
                        className="text-[0.58rem] font-700 uppercase tracking-[0.16em] text-[var(--gold)] sm:text-[0.62rem]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {project.year}
                      </div>
                      <div className="text-[0.7rem] text-[var(--text3)] sm:text-[0.72rem]">{project.duration}</div>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2.5 sm:mb-5 sm:gap-3">
                      {project.tags.slice(0, 5).map((tag) => (
                        <ToolLogo key={tag} name={tag} />
                      ))}
                    </div>

                    <h2
                      className="mb-3 text-[1.05rem] font-800 leading-[1.25] tracking-[-0.015em] text-[var(--text)] sm:text-xl"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {project.title}
                    </h2>

                    <p className="mb-5 text-[0.88rem] font-light leading-[1.7] text-[var(--text2)] sm:text-sm sm:leading-[1.8]">
                      {project.shortDesc}
                    </p>

                    <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-4 sm:pt-5">
                      <div className="min-w-0">
                        <div className="mb-0.5 text-[0.58rem] font-600 uppercase tracking-[0.1em] text-[var(--text3)] sm:text-[0.6rem]">
                          Focus
                        </div>
                        <div className="text-[0.72rem] text-[var(--text2)] sm:text-xs">{project.role}</div>
                      </div>

                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="text-[0.68rem] font-700 uppercase tracking-[0.12em] text-[var(--gold)] sm:text-[0.74rem]">
                          Open
                        </span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg2)] text-[var(--text)] transition-all duration-300 group-hover:bg-[var(--gold-soft)] group-hover:text-[var(--gold)] sm:h-10 sm:w-10">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M4 10L10 4M5 4H10V9"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
