import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Gold Works | Indie Game Studio',
  description: 'Gold Works is an indie game studio crafting original games and meaningful interactive experiences.',
  icons: {
    icon: [
      {
        url: '/goldworks-favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/goldworks-icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/goldworks-apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
