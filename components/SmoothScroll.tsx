'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
      lerp: 0.1,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const links = document.querySelectorAll('a[href^="#"]')
    const handleClick = (e: Event) => {
      const link = e.currentTarget as HTMLAnchorElement
      const target = link.getAttribute('href')
      if (target && target.startsWith('#') && target.length > 1) {
        e.preventDefault()
        const el = document.querySelector(target)
        if (el) lenis.scrollTo(el as HTMLElement, { offset: -40 })
      }
    }
    links.forEach((l) => l.addEventListener('click', handleClick))

    return () => {
      links.forEach((l) => l.removeEventListener('click', handleClick))
      lenis.destroy()
    }
  }, [])

  return null
}
