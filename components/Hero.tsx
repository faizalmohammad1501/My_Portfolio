'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import MagneticButton from './MagneticButton'

function MeshGradientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth * 2
      canvas.height = window.innerHeight * 2
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }
    resize()
    window.addEventListener('resize', resize)

    const blobs = [
      { x: 0.3, y: 0.4, r: 320, color: [255, 107, 53], speed: 0.0003 },
      { x: 0.7, y: 0.7, r: 280, color: [255, 215, 0], speed: 0.0004 },
    ]

    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      blobs.forEach((blob) => {
        const cx = (blob.x + Math.sin(time * blob.speed) * 0.15) * canvas.width
        const cy = (blob.y + Math.cos(time * blob.speed * 1.3) * 0.15) * canvas.height
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, blob.r * 2)
        gradient.addColorStop(0, `rgba(${blob.color[0]}, ${blob.color[1]}, ${blob.color[2]}, 0.08)`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.beginPath()
        ctx.arc(cx, cy, blob.r * 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}

function FloatingGeometry() {
  const shapes = [
    { size: 80, top: '15%', left: '10%' },
    { size: 60, top: '70%', left: '82%' },
    { size: 100, top: '78%', left: '12%' },
  ]

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute border border-accent/15 rounded-lg"
          style={{
            top: shape.top,
            left: shape.left,
            width: shape.size,
            height: shape.size,
            willChange: 'transform',
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{
            opacity: { delay: i * 0.3 + 1, duration: 1 },
            scale: { delay: i * 0.3 + 1, duration: 1, type: 'spring' },
            rotate: { duration: 30 + i * 5, repeat: Infinity, ease: 'linear' },
          }}
        />
      ))}
    </div>
  )
}

function GridOverlay() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden opacity-[0.03]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,107,53,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,53,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <MeshGradientCanvas />
      <FloatingGeometry />
      <GridOverlay />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: 'spring', stiffness: 80 }}
          className="mb-10 inline-block relative"
        >
          <div className="w-28 h-28 mx-auto relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent via-accent-secondary to-accent-tertiary opacity-20 blur-xl animate-glow-pulse" />
            <div className="relative w-full h-full rounded-3xl border border-white/10 flex items-center justify-center bg-surface/80 backdrop-blur-xl overflow-hidden">
              <span className="text-5xl font-bold text-gradient">F</span>
              <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-3"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 font-mono text-[11px] tracking-[0.3em] uppercase text-accent">
            Senior Data Engineer
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-7xl md:text-[8rem] lg:text-[10rem] font-bold tracking-tighter leading-[0.85] mb-8"
        >
          <span className="text-foreground">Faizal</span>
          <br />
          <span className="text-gradient-warm">Mohammad</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="w-40 h-[2px] mx-auto mb-10 bg-gradient-to-r from-transparent via-accent to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex gap-5 justify-center"
        >
          <MagneticButton
            href="#projects"
            className="group relative px-8 py-3.5 overflow-hidden rounded-full bg-gradient-to-r from-accent to-accent-secondary/80 inline-block"
          >
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative font-mono text-xs tracking-wider text-background font-bold uppercase">
              Explore Work
            </span>
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="group relative px-8 py-3.5 overflow-hidden rounded-full border border-white/10 hover:border-accent/40 transition-all duration-500 inline-block"
          >
            <span className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative font-mono text-xs tracking-wider text-text-muted group-hover:text-foreground transition-colors">
              Say Hello
            </span>
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-text-muted">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-accent/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
