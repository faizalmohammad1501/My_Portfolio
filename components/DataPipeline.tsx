'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const sources = [
  { id: 's1', label: 'Kafka', y: 60 },
  { id: 's2', label: 'S3', y: 160 },
  { id: 's3', label: 'API', y: 260 },
]

const stages = [
  { id: 'bronze', label: 'Bronze', x: 350, y: 160, color: '#cd7f32' },
  { id: 'silver', label: 'Silver', x: 560, y: 160, color: '#c0c0c0' },
  { id: 'gold', label: 'Gold', x: 770, y: 160, color: '#ffd700' },
]

const outputs = [
  { id: 'o1', label: 'ML Models', y: 60, color: '#ff6b35' },
  { id: 'o2', label: 'Analytics', y: 160, color: '#00e5a0' },
  { id: 'o3', label: 'Dashboards', y: 260, color: '#ff9a56' },
]

function FlowParticle({ path, delay, color }: { path: string; delay: number; color: string }) {
  return (
    <circle r="3" fill={color}>
      <animateMotion dur="3s" repeatCount="indefinite" begin={`${delay}s`} path={path} />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        dur="3s"
        repeatCount="indefinite"
        begin={`${delay}s`}
      />
    </circle>
  )
}

function PulsingNode({ x, y, label, color, size = 28 }: { x: number; y: number; label: string; color: string; size?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={size + 12} fill={color} opacity="0.05">
        <animate attributeName="r" values={`${size + 8};${size + 20};${size + 8}`} dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.1;0;0.1" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx={x} cy={y} r={size} fill="rgba(20,20,20,0.95)" stroke={color} strokeWidth="1.5" />
      <circle cx={x} cy={y} r={size - 6} fill={color} opacity="0.15" />
      <text
        x={x}
        y={y + 3}
        textAnchor="middle"
        fill={color}
        fontSize="9"
        fontFamily="var(--font-jetbrains), monospace"
        letterSpacing="1.5"
        style={{ textTransform: 'uppercase', fontWeight: 600 }}
      >
        {label}
      </text>
    </g>
  )
}

export default function DataPipeline() {
  const sourceX = 130
  const outputX = 980

  const buildPath = (x1: number, y1: number, x2: number, y2: number) => {
    const cx = (x1 + x2) / 2
    return `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`
  }

  const paths: { d: string; from: string; color: string }[] = []
  sources.forEach((s) => paths.push({ d: buildPath(sourceX, s.y, stages[0].x, stages[0].y), from: 'src', color: '#ff6b35' }))
  paths.push({ d: buildPath(stages[0].x, stages[0].y, stages[1].x, stages[1].y), from: 'b', color: '#ffd700' })
  paths.push({ d: buildPath(stages[1].x, stages[1].y, stages[2].x, stages[2].y), from: 's', color: '#ffd700' })
  outputs.forEach((o) => paths.push({ d: buildPath(stages[2].x, stages[2].y, outputX, o.y), from: 'gold', color: o.color }))

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="section-divider" />

      <div className="max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent block mb-6 text-center"
        >
          Architecture
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-4 text-center tracking-tight"
        >
          Data <span className="text-gradient-warm">in motion</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-text-muted text-sm text-center mb-16 font-mono tracking-wider"
        >
          Medallion architecture — live
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card-glass rounded-3xl p-6 md:p-10 relative"
        >
          <div className="overflow-x-auto">
            <svg viewBox="0 0 1100 320" className="w-full min-w-[800px]">
              <defs>
                <linearGradient id="grad-orange" x1="0" x2="1">
                  <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#cd7f32" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="grad-gold" x1="0" x2="1">
                  <stop offset="0%" stopColor="#cd7f32" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ffd700" stopOpacity="0.6" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {paths.map((p, i) => (
                <path
                  key={i}
                  d={p.d}
                  stroke={p.color}
                  strokeOpacity="0.15"
                  strokeWidth="1.5"
                  fill="none"
                />
              ))}

              {paths.map((p, i) => (
                <FlowParticle key={`particle-${i}`} path={p.d} delay={i * 0.4} color={p.color} />
              ))}

              {sources.map((s) => (
                <PulsingNode key={s.id} x={sourceX} y={s.y} label={s.label} color="#ff6b35" size={26} />
              ))}

              {stages.map((stage) => (
                <PulsingNode key={stage.id} x={stage.x} y={stage.y} label={stage.label} color={stage.color} size={32} />
              ))}

              {outputs.map((o) => (
                <PulsingNode key={o.id} x={outputX} y={o.y} label={o.label} color={o.color} size={28} />
              ))}

              <text x={sourceX} y={310} textAnchor="middle" fill="#555" fontSize="9" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2" style={{ textTransform: 'uppercase' }}>Sources</text>
              <text x={560} y={310} textAnchor="middle" fill="#555" fontSize="9" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2" style={{ textTransform: 'uppercase' }}>Lakehouse</text>
              <text x={outputX} y={310} textAnchor="middle" fill="#555" fontSize="9" fontFamily="var(--font-jetbrains), monospace" letterSpacing="2" style={{ textTransform: 'uppercase' }}>Consumers</text>
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5">
            {[
              { label: 'Throughput', value: '2.4M', unit: 'rows/min', color: '#ff6b35' },
              { label: 'Latency', value: '< 50', unit: 'ms p99', color: '#ffd700' },
              { label: 'Uptime', value: '99.9', unit: 'percent', color: '#00e5a0' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-center"
              >
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted mb-2">{stat.label}</div>
                <div className="text-2xl md:text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="font-mono text-[9px] text-text-muted mt-1">{stat.unit}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
