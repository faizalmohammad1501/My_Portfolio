'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState, MouseEvent } from 'react'

const projects = [
  {
    title: 'ETL Modernization',
    tech: ['PySpark', 'AWS Glue', 'Spark SQL'],
    color: '#ff6b35',
    gradient: 'from-[#ff6b35]/20 to-transparent',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 14l6 6M20 14l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Real-Time Fraud Detection',
    tech: ['Kinesis', 'Spark Streaming', 'Lambda'],
    color: '#ffd700',
    gradient: 'from-[#ffd700]/20 to-transparent',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Databricks Lakehouse',
    tech: ['Databricks', 'Delta Lake', 'Azure'],
    color: '#00e5a0',
    gradient: 'from-[#00e5a0]/20 to-transparent',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'GenAI Data Pipeline',
    tech: ['Python', 'FAISS', 'LangChain'],
    color: '#ff9a56',
    gradient: 'from-[#ff9a56]/20 to-transparent',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 1v4M12 19v4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M1 12h4M19 12h4M4.2 19.8l2.8-2.8M17 7l2.8-2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 400, damping: 30, mass: 0.5 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 400, damping: 30, mass: 0.5 })
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      style={{ perspective: 1200 }}
      className="group"
    >
      <motion.div
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="card-glass rounded-2xl p-8 relative overflow-hidden h-full"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

        <motion.div
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, ${project.color}22, transparent 50%)`,
            opacity: isHovered ? 1 : 0,
          }}
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        />

        <motion.div
          style={{ transform: 'translateZ(40px)' }}
          animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative z-10 mb-6"
        >
          <div style={{ color: project.color }}>{project.icon}</div>
        </motion.div>

        <motion.h3
          style={{ transform: 'translateZ(30px)' }}
          className="text-xl font-bold mb-4 tracking-tight relative z-10 group-hover:text-foreground transition-colors"
        >
          {project.title}
        </motion.h3>

        <motion.div
          style={{ transform: 'translateZ(20px)' }}
          className="flex flex-wrap gap-2 relative z-10"
        >
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md font-mono text-[9px] uppercase tracking-wider border transition-all duration-300"
              style={{
                borderColor: isHovered ? `${project.color}44` : 'rgba(255,255,255,0.05)',
                color: isHovered ? project.color : '#777',
              }}
            >
              {tech}
            </span>
          ))}
        </motion.div>

        <motion.div
          style={{ transform: 'translateZ(50px)' }}
          animate={{ rotate: isHovered ? 45 : 0 }}
          className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover:border-accent/20 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M1 13L13 1M13 1H5M13 1V9" stroke={isHovered ? project.color : '#555'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden">
      <div className="section-divider" />

      <div className="max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent block mb-6 text-center"
        >
          Work
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-16 text-center tracking-tight"
        >
          Featured <span className="text-gradient-warm">Projects</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
