import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/cart'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'

export const metadata: Metadata = {
  title: 'Ausom Ukraine — Електросамокати для дорослих',
  description: 'Офіційний дистриб\'ютор Ausom в Україні. Гарантія 2 роки, безкоштовна доставка.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
