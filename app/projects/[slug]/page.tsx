import { notFound } from 'next/navigation'
import { projects } from '@/data'
import ProjectDetailClient from './ProjectDetailClient'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((item) => item.slug === params.slug)
  if (!project) notFound()

  const currentIndex = projects.findIndex((item) => item.slug === params.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return <ProjectDetailClient project={project} nextProject={nextProject} />
}
