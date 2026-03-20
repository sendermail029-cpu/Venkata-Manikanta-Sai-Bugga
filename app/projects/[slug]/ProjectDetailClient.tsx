'use client'

import Link from 'next/link'
import ToolLogo from '@/components/ui/ToolLogo'
import { projects } from '@/data'

interface Props {
  project: typeof projects[0]
  nextProject: typeof projects[0]
}

const TOOL_DETAILS: Record<string, string> = {
  Tableau: 'Used to build interactive dashboards and present findings clearly.',
  Python: 'Used for data analysis, exploration, and analytical problem solving.',
  SQL: 'Used to work with structured data and support analytical investigation.',
  Blockchain: 'Used as the main research theme for decentralization, transparency, and security analysis.',
  Cybersecurity: 'Used to evaluate security implications and digital trust.',
  'Cloud Computing': 'Used to frame infrastructure, transformation, and technology adoption analysis.',
  'Artificial Intelligence': 'Used to support technology strategy and emerging systems understanding.',
  'Machine Learning': 'Used for predictive modeling and analytical interpretation.',
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-8">
      <h2
        className="mb-4 text-[1.1rem] font-800 tracking-[-0.02em] text-[var(--text)]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function SkillCard({ tool }: { tool: string }) {
  return (
    <div className="rounded-[22px] border border-[var(--border)] bg-[var(--bg2)] p-4">
      <div className="mb-3 flex items-center gap-3">
        <ToolLogo name={tool} size="sm" />
        <div
          className="text-sm font-800 tracking-[-0.01em] text-[var(--text)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {tool}
        </div>
      </div>
      <p className="text-sm leading-[1.75] text-[var(--text2)]">
        {TOOL_DETAILS[tool] ?? 'Used as part of the project workflow and technical analysis.'}
      </p>
    </div>
  )
}

export default function ProjectDetailClient({ project, nextProject }: Props) {
  const hasLinks = Boolean(project.links.live || project.links.github)

  return (
    <main className="pt-32 pb-24">
      <div className="container-main">
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[0.78rem] font-700 uppercase tracking-[0.14em] text-[var(--text3)] transition-colors duration-200 hover:text-[var(--gold)]"
          >
            <span aria-hidden>{'<'}</span>
            <span>All Projects</span>
          </Link>
        </div>

        <div className="mb-8 rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[var(--bg2)] px-3 py-1 text-[0.72rem] font-700 text-[var(--gold)]">
              {project.category}
            </span>
            <span className="text-sm text-[var(--text3)]">{project.duration}</span>
          </div>

          <h1
            className="max-w-[900px] text-[2rem] font-800 leading-tight tracking-[-0.04em] text-[var(--text)] md:text-[3rem]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {project.title}
          </h1>

          <p className="mt-5 max-w-[840px] text-[1rem] leading-[1.9] text-[var(--text2)]">
            {project.fullDesc}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <div key={tag} className="rounded-full border border-[var(--border)] bg-[var(--bg2)] px-4 py-2">
                <div className="flex items-center gap-2">
                  <ToolLogo name={tag} size="sm" />
                  <span className="text-sm font-700 text-[var(--text)]">{tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <Section title="Overview">
              <p className="text-[0.98rem] leading-[1.9] text-[var(--text2)]">{project.fullDesc}</p>
            </Section>

            <Section title="Project Focus">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <div className="mb-2 text-[0.75rem] font-700 uppercase tracking-[0.12em] text-[var(--gold)]">
                    Role
                  </div>
                  <p className="text-[0.98rem] leading-[1.8] text-[var(--text2)]">{project.role}</p>
                </div>
                <div>
                  <div className="mb-2 text-[0.75rem] font-700 uppercase tracking-[0.12em] text-[var(--gold)]">
                    Outcome
                  </div>
                  <p className="text-[0.98rem] leading-[1.8] text-[var(--text2)]">{project.outcome}</p>
                </div>
              </div>
            </Section>

            <Section title="Approach">
              <p className="text-[0.98rem] leading-[1.9] text-[var(--text2)]">{project.approach}</p>
            </Section>

            <Section title="Skills Demonstrated">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.tags.map((tag) => (
                  <SkillCard key={tag} tool={tag} />
                ))}
              </div>
            </Section>
          </div>

          <div className="space-y-8">
            <Section title="Tools Used">
              <div className="space-y-4">
                {project.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-start gap-3 rounded-[20px] border border-[var(--border)] bg-[var(--bg2)] p-4"
                  >
                    <ToolLogo name={tag} size="sm" />
                    <div>
                      <div
                        className="mb-1 text-sm font-800 text-[var(--text)]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {tag}
                      </div>
                      <div className="text-sm leading-[1.7] text-[var(--text2)]">
                        {TOOL_DETAILS[tag] ?? 'Used to support the project workflow and analysis.'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {hasLinks && (
              <Section title="Project Links">
                <div className="flex flex-col gap-3">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between rounded-[18px] border border-[var(--border)] bg-[var(--bg2)] px-4 py-3 text-sm font-700 text-[var(--text)] transition-colors duration-200 hover:border-[var(--gold-glow)] hover:text-[var(--gold)]"
                    >
                      <span>Open Project</span>
                      <span aria-hidden>{'>'}</span>
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between rounded-[18px] border border-[var(--border)] bg-[var(--bg2)] px-4 py-3 text-sm font-700 text-[var(--text)] transition-colors duration-200 hover:border-[var(--gold-glow)] hover:text-[var(--gold)]"
                    >
                      <span>GitHub</span>
                      <span aria-hidden>{'>'}</span>
                    </a>
                  )}
                </div>
              </Section>
            )}

            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="mb-2 text-[0.75rem] font-700 uppercase tracking-[0.12em] text-[var(--gold)]">
                Next
              </div>
              <Link href={`/projects/${nextProject.slug}`} className="group flex items-center justify-between gap-4">
                <div>
                  <div
                    className="text-[1.05rem] font-800 tracking-[-0.02em] text-[var(--text)] transition-colors duration-200 group-hover:text-[var(--gold)]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {nextProject.title}
                  </div>
                  <div className="mt-2 text-sm text-[var(--text3)]">{nextProject.category}</div>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg2)] text-[var(--text)] transition-colors duration-200 group-hover:text-[var(--gold)]">
                  {'>'}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
