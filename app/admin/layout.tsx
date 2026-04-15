'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { LayoutDashboard, Package, FileText, ShoppingCart, LogOut, Menu, X, ChevronRight } from 'lucide-react'

const NAV = [
  { href: '/admin', label: 'Дашборд', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Товари', icon: Package },
  { href: '/admin/orders', label: 'Замовлення', icon: ShoppingCart },
  { href: '/admin/blog', label: 'Блог', icon: FileText },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)
  const [authed, setAuthed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setAuthed(true)
      } else if (pathname !== '/admin/login') {
        router.replace('/admin/login')
      }
      setChecking(false)
    })
  }, [pathname, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>

  if (checking) return (
    <div style={{ minHeight: '100vh', background: '#0b0b0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 32, height: 32, border: '2px solid #ff5c00', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  if (!authed) return null

  return (
    <div style={{ minHeight: '100vh', background: '#f4f4f2', display: 'flex' }}>
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 40 }} />}

      <aside style={{ width: 256, background: '#0b0b0b', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: 24, borderBottom: '1px solid rgba(255,255,255,.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: 'sans-serif', fontSize: 20, fontWeight: 800, color: 'white', textDecoration: 'none', letterSpacing: '.04em' }}>
            AUSOM <span style={{ color: '#ff5c00' }}>UA</span>
          </Link>
        </div>
        <div style={{ padding: '12px 16px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' as const, color: '#ff5c00', background: 'rgba(255,92,0,.1)', padding: '6px 12px', borderRadius: 8 }}>Admin Panel</span>
        </div>
        <nav style={{ flex: 1, padding: '8px 12px' }}>
          {NAV.map(item => {
            const Icon = item.icon
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, marginBottom: 4, fontSize: 14, fontWeight: 500, textDecoration: 'none', background: active ? '#ff5c00' : 'transparent', color: active ? 'white' : 'rgba(255,255,255,.55)' }}>
                <Icon size={17} />{item.label}
                {active && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
              </Link>
            )
          })}
        </nav>
        <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,.05)' }}>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.4)' }}>
            <LogOut size={16} />Вийти
          </button>
        </div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ background: 'white', borderBottom: '1px solid #e8e8e5', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', gap: 16, position: 'sticky' as const, top: 0, zIndex: 30 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888884' }}><Menu size={20} /></button>
          <span style={{ fontSize: 14, color: '#888884' }}>{NAV.find(n => pathname === n.href || (n.href !== '/admin' && pathname.startsWith(n.href)))?.label || 'Адмін-панель'}</span>
          <Link href="/" target="_blank" style={{ marginLeft: 'auto', fontSize: 12, color: '#888884', textDecoration: 'none' }}>↗ На сайт</Link>
        </header>
        <main style={{ flex: 1, padding: 32 }}>{children}</main>
      </div>
    </div>
  )
}
