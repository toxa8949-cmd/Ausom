import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/cart'
import { ThemeProvider } from '@/lib/theme'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'

export const metadata: Metadata = {
  title: 'Ausom Ukraine — Електросамокати для дорослих',
  description: "Офіційний дистриб'ютор Ausom в Україні. Гарантія 2 роки, безкоштовна доставка.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme.
            Default: light. Dark only if user explicitly toggled the switch before
            (saved in localStorage). System preference is intentionally ignored —
            we want a consistent light look for new visitors. */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              var t = localStorage.getItem('ausom-theme') === 'dark' ? 'dark' : 'light';
              document.documentElement.setAttribute('data-theme', t);
            } catch(e){}
          })();
        `}} />
      </head>
      <body>
        <ThemeProvider>
          <CartProvider>
            <AnnouncementBar />
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
