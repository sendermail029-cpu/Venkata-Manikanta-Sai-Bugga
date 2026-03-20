import type { IconType } from 'react-icons'
import {
  SiAngular,
  SiBootstrap,
  SiCss,
  SiDocker,
  SiFigma,
  SiGithub,
  SiGooglecloud,
  SiHtml5,
  SiJavascript,
  SiKubernetes,
  SiMysql,
  SiNetlify,
  SiOpenai,
  SiOpencv,
  SiPostman,
  SiPython,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
} from 'react-icons/si'
import { FaAws, FaCode, FaDatabase, FaJava, FaShieldHalved, FaWandMagicSparkles } from 'react-icons/fa6'
import { TbPlugConnected, TbVectorSpline } from 'react-icons/tb'

const TOOL_ICONS: Record<string, { icon: IconType; color: string }> = {
  Angular: { icon: SiAngular, color: '#dd0031' },
  React: { icon: SiReact, color: '#61dafb' },
  Bootstrap: { icon: SiBootstrap, color: '#7c3aed' },
  JavaScript: { icon: SiJavascript, color: '#f7df1e' },
  TypeScript: { icon: SiTypescript, color: '#3178c6' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06b6d4' },
  Flowbite: { icon: FaCode, color: '#2563eb' },
  HTML: { icon: SiHtml5, color: '#e34f26' },
  HTML5: { icon: SiHtml5, color: '#e34f26' },
  CSS: { icon: SiCss, color: '#1572b6' },
  CSS3: { icon: SiCss, color: '#1572b6' },
  'Spring Boot': { icon: SiSpringboot, color: '#6db33f' },
  Java: { icon: FaJava, color: '#f89820' },
  Python: { icon: SiPython, color: '#3776ab' },
  SQL: { icon: FaDatabase, color: '#2563eb' },
  Tableau: { icon: FaDatabase, color: '#4f46e5' },
  'Artificial Intelligence': { icon: SiOpenai, color: '#111827' },
  'Generative AI': { icon: SiOpenai, color: '#10b981' },
  'Machine Learning': { icon: SiOpenai, color: '#0f766e' },
  'Deep Learning': { icon: SiOpenai, color: '#7c3aed' },
  Cybersecurity: { icon: FaShieldHalved, color: '#475569' },
  Blockchain: { icon: FaCode, color: '#0f172a' },
  'Cloud Computing': { icon: FaAws, color: '#f59e0b' },
  'Google Kubernetes Engine': { icon: SiKubernetes, color: '#326ce5' },
  'Identity and Access Management': { icon: FaShieldHalved, color: '#334155' },
  'Infrastructure as Code (IaC)': { icon: FaCode, color: '#475569' },
  Terraform: { icon: SiTerraform, color: '#7b42bc' },
  'AWS Cloud': { icon: FaAws, color: '#ff9900' },
  'GCP Cloud Functions': { icon: SiGooglecloud, color: '#4285f4' },
  Git: { icon: FaCode, color: '#ef4444' },
  GitHub: { icon: SiGithub, color: '#111827' },
  Postman: { icon: SiPostman, color: '#ff6c37' },
  MySQL: { icon: SiMysql, color: '#00758f' },
  WebSockets: { icon: TbPlugConnected, color: '#1f2937' },
  'REST APIs': { icon: TbPlugConnected, color: '#334155' },
  Authentication: { icon: FaShieldHalved, color: '#475569' },
  'Schema Design': { icon: FaDatabase, color: '#0f766e' },
  'Query Optimization': { icon: FaDatabase, color: '#7c3aed' },
  Figma: { icon: SiFigma, color: '#f24e1e' },
  Wireframing: { icon: TbVectorSpline, color: '#64748b' },
  Prototyping: { icon: TbVectorSpline, color: '#475569' },
  'UI Systems': { icon: FaWandMagicSparkles, color: '#0f172a' },
  OpenCV: { icon: SiOpencv, color: '#0f766e' },
  'Face Recognition': { icon: FaShieldHalved, color: '#7c3aed' },
  Automation: { icon: FaCode, color: '#475569' },
  Docker: { icon: SiDocker, color: '#2496ed' },
  Netlify: { icon: SiNetlify, color: '#14b8a6' },
  Deployment: { icon: FaCode, color: '#334155' },
  Ada: { icon: FaCode, color: '#7c3aed' },
}

export default function ToolLogo({
  name,
  size = 'md',
  variant = 'badge',
}: {
  name: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'badge' | 'plain'
}) {
  const config = TOOL_ICONS[name] ?? { icon: FaCode, color: '#111827' }
  const Icon = config.icon

  const sizeStyles = {
    sm: {
      container: 'h-11 w-11 rounded-2xl',
      icon: 'text-[1.2rem]',
    },
    md: {
      container: 'h-14 w-14 rounded-[1.35rem]',
      icon: 'text-[1.55rem]',
    },
    lg: {
      container: 'h-20 w-20 rounded-[1.75rem] md:h-24 md:w-24',
      icon: 'text-[2rem] md:text-[2.5rem]',
    },
  }[size]

  if (variant === 'plain') {
    return (
      <div className="group relative" title={name} aria-label={name}>
        <Icon className={sizeStyles.icon} style={{ color: config.color }} />
      </div>
    )
  }

  return (
    <div className="group relative" title={name} aria-label={name}>
      <div
        className={`${sizeStyles.container} flex items-center justify-center border border-[var(--border)] bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-[1.03] group-hover:border-[var(--gold)]/45`}
      >
        <Icon className={sizeStyles.icon} style={{ color: config.color }} />
      </div>
    </div>
  )
}
