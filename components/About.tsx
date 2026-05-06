'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import CountUp from './CountUp'

const metrics = [
  { end: 5, suffix: '+', label: 'Years', icon: '◆' },
  { end: 150, suffix: '+', label: 'Users Impacted', icon: '◈' },
  { end: 45, suffix: '%', label: 'Perf Boost', icon: '▲' },
  { end: 12, suffix: '+', label: 'Pipelines', icon: '◎' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      <div className="section-divider" />

      <div className="absolute inset-0 bg-mesh pointer-events-none" />

      <motion.div style={{ scale, opacity }} className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2 relative flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: 'spring' }}
              className="relative w-72 h-72"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/10 via-accent-secondary/5 to-transparent morph-blob" />
              <div className="absolute inset-4 rounded-full border border-accent/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gradient mb-1">5+</div>
                  <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-text-muted">Years Building</div>
                  <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-text-muted">Data Systems</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent block mb-6"
            >
              About
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tight"
            >
              Architecting <span className="text-gradient-warm">data</span> at scale
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-text-muted text-base leading-relaxed max-w-lg mb-10"
            >
              Building reliable pipelines across financial services, healthcare, and retail. Currently powering fraud detection at Capital One with AWS-based solutions.
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, type: 'spring' }}
                  className="card-glass rounded-xl p-4 text-center hover-glow cursor-default group"
                >
                  <div className="text-accent/40 text-lg mb-2 group-hover:text-accent transition-colors">
                    {metric.icon}
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-0.5">
                    <CountUp end={metric.end} suffix={metric.suffix} />
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
