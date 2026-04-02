import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PSsathee.ai — India\'s Career Operating System',
  description: 'AI-powered career guidance for Indian students. 64 careers, real projects, ₹1999/year career insurance.',
  keywords: ['career guidance', 'India education', 'AI career', 'UPSC preparation', 'JEE', 'NEET', 'government jobs'],
  openGraph: {
    title: 'PSsathee.ai — Is Your Child\'s Career Future-Proof?',
    description: 'Parents spend ₹5-15L on coaching. 70% of students pick wrong career. AI will replace 78% of jobs by 2030. ₹1999 = Career Insurance.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  )
}
