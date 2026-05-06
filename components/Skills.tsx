'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Category = 'cloud' | 'lang' | 'data' | 'ai'

interface Node {
  id: string
  label: string
  category: Category
  level: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulse: number
}

interface Edge {
  a: string
  b: string
}

const COLORS: Record<Category, string> = {
  cloud: '#ff6b35',
  lang: '#ffd700',
  data: '#00e5a0',
  ai: '#ff9a56',
}

const NODES_DATA: Omit<Node, 'x' | 'y' | 'vx' | 'vy' | 'radius' | 'pulse'>[] = [
  { id: 'aws', label: 'AWS', category: 'cloud', level: 95 },
  { id: 'azure', label: 'Azure', category: 'cloud', level: 85 },
  { id: 'databricks', label: 'Databricks', category: 'cloud', level: 88 },
  { id: 'snowflake', label: 'Snowflake', category: 'cloud', level: 85 },
  { id: 'redshift', label: 'Redshift', category: 'cloud', level: 82 },

  { id: 'python', label: 'Python', category: 'lang', level: 95 },
  { id: 'sql', label: 'SQL', category: 'lang', level: 93 },
  { id: 'scala', label: 'Scala', category: 'lang', level: 75 },
  { id: 'pyspark', label: 'PySpark', category: 'lang', level: 92 },
  { id: 'pandas', label: 'Pandas', category: 'lang', level: 90 },

  { id: 'airflow', label: 'Airflow', category: 'data', level: 88 },
  { id: 'kafka', label: 'Kafka', category: 'data', level: 80 },
  { id: 'sparksql', label: 'Spark SQL', category: 'data', level: 90 },
  { id: 'delta', label: 'Delta Lake', category: 'data', level: 85 },

  { id: 'rag', label: 'RAG', category: 'ai', level: 78 },
  { id: 'langchain', label: 'LangChain', category: 'ai', level: 75 },
  { id: 'faiss', label: 'FAISS', category: 'ai', level: 72 },
]

const EDGES: Edge[] = [
  { a: 'python', b: 'pyspark' },
  { a: 'python', b: 'pandas' },
  { a: 'python', b: 'airflow' },
  { a: 'python', b: 'langchain' },
  { a: 'pyspark', b: 'sparksql' },
  { a: 'pyspark', b: 'databricks' },
  { a: 'sparksql', b: 'sql' },
  { a: 'sql', b: 'snowflake' },
  { a: 'sql', b: 'redshift' },
  { a: 'aws', b: 'redshift' },
  { a: 'aws', b: 'kafka' },
  { a: 'azure', b: 'databricks' },
  { a: 'databricks', b: 'delta' },
  { a: 'delta', b: 'sparksql' },
  { a: 'scala', b: 'pyspark' },
  { a: 'scala', b: 'kafka' },
  { a: 'airflow', b: 'aws' },
  { a: 'airflow', b: 'databricks' },
  { a: 'rag', b: 'langchain' },
  { a: 'rag', b: 'faiss' },
  { a: 'langchain', b: 'python' },
  { a: 'kafka', b: 'sparksql' },
]

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'cloud', label: 'Cloud' },
  { id: 'lang', label: 'Languages' },
  { id: 'data', label: 'Data' },
  { id: 'ai', label: 'AI / ML' },
]

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<Node[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000, hoveredId: null as string | null })
  const [activeFilter, setActiveFilter] = useState<Category | null>(null)
  const filterRef = useRef<Category | null>(null)
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null)

  useEffect(() => {
    filterRef.current = activeFilter
  }, [activeFilter])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let dpr = window.devicePixelRatio || 1
    let width = 0
    let height = 0
    let animationId = 0

    const resize = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    nodesRef.current = NODES_DATA.map((n, i) => {
      const angle = (i / NODES_DATA.length) * Math.PI * 2
      return {
        ...n,
        x: width / 2 + Math.cos(angle) * 150,
        y: height / 2 + Math.sin(angle) * 150,
        vx: 0,
        vy: 0,
        radius: 8 + (n.level / 100) * 14,
        pulse: Math.random() * Math.PI * 2,
      }
    })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    const handleMouseLeave = () => {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const tick = () => {
      const nodes = nodesRef.current
      const cx = width / 2
      const cy = height / 2
      const filter = filterRef.current

      let hoveredId: string | null = null
      let minDist = Infinity
      for (const n of nodes) {
        const dx = mouseRef.current.x - n.x
        const dy = mouseRef.current.y - n.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < n.radius + 6 && d < minDist) {
          minDist = d
          hoveredId = n.id
        }
      }
      mouseRef.current.hoveredId = hoveredId

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        const dxC = cx - a.x
        const dyC = cy - a.y
        a.vx += dxC * 0.0008
        a.vy += dyC * 0.0008

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const minDistance = a.radius + b.radius + 28
          if (dist < minDistance) {
            const f = (minDistance - dist) / dist * 0.05
            a.vx -= dx * f
            a.vy -= dy * f
            b.vx += dx * f
            b.vy += dy * f
          } else {
            const f = 200 / (dist * dist)
            a.vx -= (dx / dist) * f
            a.vy -= (dy / dist) * f
            b.vx += (dx / dist) * f
            b.vy += (dy / dist) * f
          }
        }
      }

      for (const edge of EDGES) {
        const a = nodes.find((n) => n.id === edge.a)
        const b = nodes.find((n) => n.id === edge.b)
        if (!a || !b) continue
        const dx = b.x - a.x
        const dy = b.y - a.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const target = 110
        const f = (dist - target) * 0.003
        a.vx += (dx / dist) * f
        a.vy += (dy / dist) * f
        b.vx -= (dx / dist) * f
        b.vy -= (dy / dist) * f
      }

      if (hoveredId) {
        const h = nodes.find((n) => n.id === hoveredId)
        if (h) {
          const dx = mouseRef.current.x - h.x
          const dy = mouseRef.current.y - h.y
          h.vx += dx * 0.02
          h.vy += dy * 0.02
        }
      }

      for (const n of nodes) {
        n.vx *= 0.85
        n.vy *= 0.85
        n.x += n.vx
        n.y += n.vy
        n.pulse += 0.04
        const pad = n.radius + 8
        if (n.x < pad) { n.x = pad; n.vx *= -0.5 }
        if (n.x > width - pad) { n.x = width - pad; n.vx *= -0.5 }
        if (n.y < pad) { n.y = pad; n.vy *= -0.5 }
        if (n.y > height - pad) { n.y = height - pad; n.vy *= -0.5 }
      }

      ctx.clearRect(0, 0, width, height)

      const isDimmed = (id: string, cat: Category) => {
        if (filter && cat !== filter) return true
        if (hoveredId) {
          if (id === hoveredId) return false
          const connected = EDGES.some(
            (e) => (e.a === hoveredId && e.b === id) || (e.b === hoveredId && e.a === id)
          )
          return !connected
        }
        return false
      }

      for (const edge of EDGES) {
        const a = nodes.find((n) => n.id === edge.a)
        const b = nodes.find((n) => n.id === edge.b)
        if (!a || !b) continue
        const dimmed = isDimmed(a.id, a.category) || isDimmed(b.id, b.category)
        const isHoverEdge = hoveredId && (a.id === hoveredId || b.id === hoveredId)

        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)

        if (isHoverEdge) {
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
          grad.addColorStop(0, COLORS[a.category])
          grad.addColorStop(1, COLORS[b.category])
          ctx.strokeStyle = grad
          ctx.globalAlpha = 0.6
          ctx.lineWidth = 1.2
        } else {
          ctx.strokeStyle = '#ffffff'
          ctx.globalAlpha = dimmed ? 0.02 : 0.08
          ctx.lineWidth = 0.8
        }
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      for (const n of nodes) {
        const dimmed = isDimmed(n.id, n.category)
        const color = COLORS[n.category]
        const alpha = dimmed ? 0.15 : 1
        const isHovered = n.id === hoveredId
        const pulseR = Math.sin(n.pulse) * 2 + (isHovered ? 6 : 0)

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius + pulseR + 8, 0, Math.PI * 2)
        const glow = ctx.createRadialGradient(n.x, n.y, n.radius, n.x, n.y, n.radius + pulseR + 16)
        glow.addColorStop(0, color + (isHovered ? '66' : '33'))
        glow.addColorStop(1, color + '00')
        ctx.fillStyle = glow
        ctx.globalAlpha = alpha
        ctx.fill()

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#0a0a0a'
        ctx.fill()
        ctx.strokeStyle = color
        ctx.lineWidth = isHovered ? 2 : 1.2
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius - 4, 0, Math.PI * 2)
        ctx.fillStyle = color + '22'
        ctx.fill()

        if (n.radius > 12) {
          ctx.fillStyle = dimmed ? color + '55' : color
          ctx.font = `600 ${isHovered ? 11 : 10}px var(--font-jetbrains), monospace`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(n.label, n.x, n.y)
        }

        ctx.globalAlpha = 1
      }

      canvas.style.cursor = hoveredId ? 'pointer' : 'default'

      animationId = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const id = mouseRef.current.hoveredId
      if (id) {
        const node = nodesRef.current.find((n) => n.id === id)
        setHoveredNode(node || null)
      } else {
        setHoveredNode(null)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="skills" className="py-32 px-6 relative overflow-hidden">
      <div className="section-divider" />

      <div className="max-w-6xl mx-auto relative">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent block mb-6 text-center"
        >
          Expertise
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-4 text-center tracking-tight"
        >
          Tech <span className="text-gradient-warm">Arsenal</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-text-muted text-sm text-center mb-10 font-mono tracking-wider"
        >
          Hover a node — explore the graph
        </motion.p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setActiveFilter(null)}
            className={`px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all duration-300 border ${
              activeFilter === null
                ? 'border-white/20 bg-white/5 text-foreground'
                : 'border-white/5 text-text-muted hover:border-white/10'
            }`}
          >
            All
          </motion.button>
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveFilter(activeFilter === cat.id ? null : cat.id)}
              className={`px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all duration-300 border flex items-center gap-2 ${
                activeFilter === cat.id ? 'bg-white/5' : 'border-white/5 hover:border-white/10'
              }`}
              style={{
                borderColor: activeFilter === cat.id ? COLORS[cat.id] + '66' : undefined,
                color: activeFilter === cat.id ? COLORS[cat.id] : '#777',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: COLORS[cat.id], boxShadow: `0 0 8px ${COLORS[cat.id]}` }}
              />
              {cat.label}
            </motion.button>
          ))}
        </div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full h-[600px] card-glass rounded-3xl overflow-hidden"
        >
          <canvas ref={canvasRef} className="absolute inset-0" />

          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-6 left-6 card-glass rounded-xl p-4 pointer-events-none border"
              style={{ borderColor: COLORS[hoveredNode.category] + '40' }}
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted mb-1">
                {hoveredNode.category}
              </div>
              <div className="text-2xl font-bold mb-2" style={{ color: COLORS[hoveredNode.category] }}>
                {hoveredNode.label}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${hoveredNode.level}%`,
                      background: COLORS[hoveredNode.category],
                    }}
                  />
                </div>
                <span className="font-mono text-[10px] text-text-muted">{hoveredNode.level}%</span>
              </div>
            </motion.div>
          )}

          <div className="absolute bottom-6 right-6 flex gap-4 font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted pointer-events-none">
            <span>{NODES_DATA.length} Nodes</span>
            <span className="text-white/20">·</span>
            <span>{EDGES.length} Edges</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
