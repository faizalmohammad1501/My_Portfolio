'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = ''
    }, 2400)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <svg
              width="320"
              height="80"
              viewBox="0 0 320 80"
              className="overflow-visible"
            >
              <defs>
                <linearGradient id="preloader-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff6b35" />
                  <stop offset="50%" stopColor="#ffd700" />
                  <stop offset="100%" stopColor="#00e5a0" />
                </linearGradient>
              </defs>
              <motion.text
                x="160"
                y="58"
                textAnchor="middle"
                fontSize="60"
                fontWeight="800"
                fontFamily="var(--font-space), sans-serif"
                fill="none"
                stroke="url(#preloader-grad)"
                strokeWidth="1.2"
                strokeDasharray="600"
                initial={{ strokeDashoffset: 600, opacity: 0.6 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                transition={{ duration: 1.4, ease: [0.7, 0, 0.3, 1] }}
                style={{ letterSpacing: '0.05em' }}
              >
                FAIZAL
              </motion.text>
              <motion.text
                x="160"
                y="58"
                textAnchor="middle"
                fontSize="60"
                fontWeight="800"
                fontFamily="var(--font-space), sans-serif"
                fill="url(#preloader-grad)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                style={{ letterSpacing: '0.05em' }}
              >
                FAIZAL
              </motion.text>
            </svg>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: [0.7, 0, 0.3, 1] }}
              className="h-[1px] mt-3 bg-gradient-to-r from-transparent via-accent to-transparent origin-left"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.4 }}
              className="text-center mt-4 font-mono text-[10px] tracking-[0.4em] uppercase text-text-muted"
            >
              Senior Data Engineer
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: '100%' }}
            exit={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1], delay: 0.1 }}
            className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-accent/10 to-transparent pointer-events-none"
            style={{ y: '100%' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
