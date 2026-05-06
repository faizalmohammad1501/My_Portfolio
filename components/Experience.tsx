'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    company: 'Capital One',
    role: 'Senior Data Engineer',
    period: '2025 – Present',
    color: '#ff6b35',
    metrics: ['12+ Pipelines', '150+ Users', '45% Perf Gain'],
  },
  {
    company: 'CVS Health',
    role: 'Data Engineer',
    period: '2021 – 2023',
    color: '#ffd700',
    metrics: ['HIPAA Compliant', 'ML Datasets', 'Airflow Orchestration'],
  },
  {
    company: 'Target',
    role: 'Data Engineer',
    period: '2020 – 2021',
    color: '#00e5a0',
    metrics: ['Batch Pipelines', 'Star Schema', 'Spark Optimization'],
  },
]

function TimelineCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -60 : 60, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <motion.div
      ref={cardRef}
      style={{ x, opacity }}
      className="relative"
    >
      <div className="card-glass rounded-2xl p-8 hover-glow relative overflow-hidden group">
        <div
          className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
          style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }}
        />

        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-3xl font-bold tracking-tight mb-1">{exp.company}</h3>
            <div className="font-mono text-xs tracking-wider" style={{ color: exp.color }}>
              {exp.role}
            </div>
          </div>
          <div className="font-mono text-[10px] tracking-wider text-text-muted uppercase px-3 py-1 rounded-full border border-white/5">
            {exp.period}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {exp.metrics.map((metric) => (
            <span
              key={metric}
              className="px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider border"
              style={{
                borderColor: `${exp.color}22`,
                background: `${exp.color}08`,
                color: `${exp.color}cc`,
              }}
            >
              {metric}
            </span>
          ))}
        </div>

        <div
          className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
          style={{ background: exp.color }}
        />
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" ref={containerRef} className="py-32 px-6 relative overflow-hidden">
      <div className="section-divider" />

      <div className="max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent block mb-6 text-center"
        >
          Journey
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-20 text-center tracking-tight"
        >
          Where I&apos;ve <span className="text-gradient-warm">built</span>
        </motion.h2>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-white/5">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-accent via-accent-secondary to-accent-tertiary"
            />
          </div>

          <div className="space-y-8 pl-20">
            {experiences.map((exp, index) => (
              <div key={exp.company} className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', delay: index * 0.1 }}
                  className="absolute -left-[52px] top-8 w-4 h-4 rounded-full border-2 bg-background z-10"
                  style={{
                    borderColor: exp.color,
                    boxShadow: `0 0 20px ${exp.color}66`,
                  }}
                />
                <TimelineCard exp={exp} index={index} />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 ml-20"
        >
          <div className="card-glass rounded-xl p-5 inline-block">
            <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-accent/60 mb-1">Education</div>
            <div className="text-lg font-bold">M.S. Computer Science</div>
            <div className="font-mono text-xs text-text-muted">Southeast Missouri State • 2025</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
