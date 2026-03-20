'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ToolLogo from '@/components/ui/ToolLogo'

const toolCards = [
  {
    name: 'Artificial Intelligence',
    description: 'Applied AI concepts across analytics, automation, and solution-focused technical work.',
    href: 'https://www.oracle.com/artificial-intelligence/',
  },
  {
    name: 'Generative AI',
    description:
      'Built familiarity with modern generative AI concepts through coursework and professional certifications.',
    href: 'https://www.oracle.com/artificial-intelligence/generative-ai/',
  },
  {
    name: 'Machine Learning',
    description: 'Hands-on exposure to predictive modeling, analytical thinking, and data-driven problem solving.',
    href: 'https://cloud.google.com/learn/what-is-machine-learning',
  },
  {
    name: 'Deep Learning',
    description: 'Worked with advanced learning concepts as part of broader artificial intelligence study and practice.',
    href: 'https://developers.google.com/machine-learning/crash-course/neural-networks/video-lecture',
  },
  {
    name: 'Java',
    description: 'Used object-oriented programming principles to build structured and maintainable software solutions.',
    href: 'https://www.java.com/',
  },
  {
    name: 'Python',
    description: 'Applied Python for data analysis, predictive modeling, and technical problem-solving tasks.',
    href: 'https://www.python.org/',
  },
  {
    name: 'SQL',
    description: 'Used SQL for joins, querying, and analysis in database and business analytics coursework.',
    href: 'https://www.w3schools.com/sql/',
  },
  {
    name: 'Tableau',
    description: 'Created interactive visualizations and storytelling dashboards for analytical reporting use cases.',
    href: 'https://www.tableau.com/',
  },
  {
    name: 'Cybersecurity',
    description: 'Built security awareness through IT security coursework and Security+ aligned certification study.',
    href: 'https://www.comptia.org/certifications/security',
  },
  {
    name: 'Blockchain',
    description: 'Researched blockchain applications, transparency, decentralization, and business impact.',
    href: 'https://www.ibm.com/topics/blockchain',
  },
  {
    name: 'Cloud Computing',
    description:
      'Developed cloud fundamentals through academic work and Oracle, AWS, and Google Cloud certifications.',
    href: 'https://aws.amazon.com/what-is-cloud-computing/',
  },
  {
    name: 'Google Kubernetes Engine',
    description: 'Exposure to container orchestration concepts in cloud-native deployment environments.',
    href: 'https://cloud.google.com/kubernetes-engine',
  },
  {
    name: 'Identity and Access Management',
    description: 'Understood access control and identity practices within secure cloud and infrastructure systems.',
    href: 'https://cloud.google.com/iam',
  },
  {
    name: 'Infrastructure as Code (IaC)',
    description: 'Learned infrastructure provisioning concepts using repeatable, version-controlled configuration.',
    href: 'https://developer.hashicorp.com/terraform/intro',
  },
  {
    name: 'Terraform',
    description: 'Worked with Terraform concepts for cloud automation and infrastructure provisioning workflows.',
    href: 'https://developer.hashicorp.com/terraform',
  },
  {
    name: 'AWS Cloud',
    description: 'Built cloud knowledge through AWS learning and cloud computing certification exposure.',
    href: 'https://aws.amazon.com/',
  },
  {
    name: 'GCP Cloud Functions',
    description: 'Exposure to serverless cloud execution models within the Google Cloud ecosystem.',
    href: 'https://cloud.google.com/functions',
  },
  {
    name: 'Git',
    description: 'Used version control to manage code changes and support reliable development workflows.',
    href: 'https://git-scm.com/',
  },
  {
    name: 'GitHub',
    description: 'Used GitHub for source control collaboration, repository management, and project organization.',
    href: 'https://github.com/',
  },
]

function IntroCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="min-h-[320px] rounded-[2.35rem] border border-[var(--border)] bg-[var(--surface)]/96 p-8 shadow-[0_24px_50px_rgba(15,23,42,0.08)] transition-shadow duration-300 hover:shadow-[0_34px_80px_rgba(15,23,42,0.14)] md:p-10 lg:col-span-2"
    >
      <div className="relative mb-8 inline-flex h-24 w-24 overflow-hidden rounded-full bg-[radial-gradient(circle_at_top,var(--surface),color-mix(in srgb,var(--surface) 78%,var(--gold) 22%))] shadow-[0_18px_38px_rgba(15,23,42,0.12)]">
        <Image src="/bac1.png" alt="VB logo" fill className="object-cover" />
      </div>

      <p className="max-w-[720px] text-[1rem] leading-[1.8] text-[var(--text2)] md:text-[1.08rem]">
        Motivated and technically skilled IT professional with a strong grounding in software development,
        cloud computing, data analysis, artificial intelligence, and infrastructure-focused technologies.
      </p>
    </motion.article>
  )
}

function ToolCard({
  name,
  description,
  href,
  index,
}: {
  name: string
  description: string
  href: string
  index: number
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, delay: index * 0.012, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, rotateX: 3, rotateY: index % 2 === 0 ? -3 : 3, scale: 1.01 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-[2.15rem] border border-[var(--border)] bg-[var(--surface)]/96 p-8 shadow-[0_24px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_34px_84px_rgba(15,23,42,0.16)]"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'color-mix(in srgb, var(--gold) 26%, transparent)' }}
      />
      <div className="mb-7 text-[2.7rem] leading-none">
        <ToolLogo name={name} size="lg" variant="plain" />
      </div>

      <h3
        className="mb-4 pr-4 text-[1.02rem] font-700 leading-[1.02] whitespace-nowrap tracking-[-0.03em] text-[var(--text)] md:text-[1.08rem]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {name}
      </h3>

      <p className="max-w-[27ch] text-[0.62rem] leading-[1.8] text-[var(--text2)] md:text-[0.68rem]">
        {description}
      </p>

      <div className="mt-auto pt-8">
        <Link
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${name}`}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_82%,white_18%)] text-[var(--text)] transition-all duration-300 hover:scale-110 hover:border-[var(--gold)]/40 hover:bg-[var(--text)] hover:text-[var(--bg)]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7" />
            <path d="M9 7h8v8" />
          </svg>
        </Link>
      </div>
    </motion.article>
  )
}

export default function SkillsSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg)] py-24 text-[var(--text)] transition-colors duration-500 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(color-mix(in srgb, var(--text3) 55%, transparent) 1.1px, transparent 1.1px)',
          backgroundSize: '46px 46px',
        }}
      />

      <div className="pointer-events-none absolute left-[15%] top-14 h-16 w-16 rounded-full border border-[var(--gold)]/55" />
      <motion.div
        className="pointer-events-none absolute left-[15.4%] top-[4.4rem] h-4 w-4 rounded-full"
        style={{ background: 'var(--text)' }}
        animate={{ y: [0, 8, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          <IntroCard />

          {toolCards.map((tool, index) => (
            <ToolCard
              key={tool.name}
              name={tool.name}
              description={tool.description}
              href={tool.href}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
