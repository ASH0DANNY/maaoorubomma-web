import { LocationProvider } from '@/context/LocationContext'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import '@/main.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Maaoorubomma',
  description: 'Your one-stop destination for authentic Indian artisanal products and handicrafts.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocationProvider>
          <Navbar />
          <main style={{ padding: "20px" }}>
            {children}
          </main>
          <Footer />
        </LocationProvider>
      </body>
    </html>
  )
}
