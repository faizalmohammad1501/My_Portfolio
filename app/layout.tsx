import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import SmoothScroll from '@/components/SmoothScroll'
import Preloader from '@/components/Preloader'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'Faizal Mohammad — Senior Data Engineer',
  description: 'Senior Data Engineer specializing in scalable data solutions, cloud platforms, and ML pipelines',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        <Preloader />
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
