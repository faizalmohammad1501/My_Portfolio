'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface CountUpProps {
  end: number
  suffix?: string
  duration?: number
  decimals?: number
  className?: string
}

export default function CountUp({ end, suffix = '', duration = 1.8, decimals = 0, className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString()
  )

  useEffect(() => {
    if (inView) {
      const controls = animate(count, end, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      })
      return () => controls.stop()
    }
  }, [inView, count, end, duration])

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}
