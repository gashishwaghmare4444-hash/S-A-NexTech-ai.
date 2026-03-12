import type { Metadata } from 'next'
import { Outfit, Syne, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'S&A NexTech AI — Next-Generation AI Platform',
  description: 'Experience the future of AI with S&A NexTech AI. Powerful language models, beautiful interface, enterprise-grade reliability.',
  keywords: ['AI', 'artificial intelligence', 'chat', 'LLM', 'Groq', 'NexTech'],
  openGraph: {
    title: 'S&A NexTech AI',
    description: 'Next-Generation AI Platform',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${outfit.variable} ${syne.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
