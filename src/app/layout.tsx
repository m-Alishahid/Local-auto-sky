import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientProviders from '@/components/ClientProviders'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Local Auto Spa - Premium Mobile Car Detailing',
  description: 'Professional mobile car detailing services. We bring the detailing to you with premium quality and convenience.',

  icons: {
    icon: '/favicon.png', // 👈 yahan PNG set karo
  },



}




// 👇 Yeh alag export hona chahiye
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientProviders>
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  )
}
