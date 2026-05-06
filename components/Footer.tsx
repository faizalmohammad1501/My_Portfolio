'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/[0.03]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] text-text-muted tracking-wider"
        >
          &copy; {new Date().getFullYear()} Faizal Mohammad
        </motion.span>
        <div className="hidden md:block flex-1 mx-8 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <span className="font-mono text-[10px] text-text-muted tracking-wider">
          Built with precision
        </span>
      </div>
    </footer>
  )
}
