'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X, ChevronDown, Zap, GitCompare, Sun, Moon } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { useTheme } from '@/lib/theme'

const NAV = [
  {
    label: 'Самокати', href: '/catalog',
    children: [
      { label: 'Всі моделі',   href: '/catalog' },
      { label: 'Позашляхові', href: '/catalog?category=offroad' },
      { label: 'Міські',      href: '/catalog?category=commuter' },
      { label: 'Порівняти',   href: '/compare' },
    ],
  },
  { label: 'Запчастини', href: '/parts' },
  { label: 'Блог',       href: '/blog' },
  { label: 'Про нас',    href: '/about' },
]

export default function Header() {
  const pathname = usePathname()
  const { count } = useCart()
  const { theme, toggle } = useTheme()
  const [open,     setOpen]     = useState(false)
  const [drop,     setDrop]     = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const headerBg = scrolled
    ? 'bg-[var(--bg)]/95 backdrop-blur-xl border-b border-[var(--border)] shadow-sm'
    : 'bg-[var(--bg)]/80 backdrop-blur-md border-b border-transparent'

  return (
    <>
      <header className={`sticky top-0 z-50 h-[68px] transition-all duration-300 ${headerBg}`}>
        <div className="container-wide h-full flex items-center gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 font-display text-[22px] tracking-[.08em] text-[var(--text)] hover:text-[var(--brand-dk)] transition-colors shrink-0" onClick={() => setOpen(false)}>
            <Zap size={17} strokeWidth={2.5} className="text-[var(--brand)]" />
            AUSOM
            <sup className="font-sans text-[10px] font-bold text-[var(--brand-dk)] tracking-normal -mt-2">UA</sup>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV.map(item => (
              <div key={item.label} className="relative"
                onMouseEnter={() => item.children && setDrop(item.label)}
                onMouseLeave={() => setDrop(null)}>
                <Link href={item.href}
                  className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium rounded-md transition-all relative ${
                    isActive(item.href)
                      ? 'text-[var(--text)] bg-[var(--bg-surface)]'
                      : 'text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--bg-surface)]'
                  }`}>
                  {item.label}
                  {item.children && (
                    <ChevronDown size={12} className={`transition-transform duration-200 ${drop === item.label ? 'rotate-180' : ''} opacity-60`} />
                  )}
                </Link>
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[var(--brand)] rounded-full" />
                )}
                {item.children && drop === item.label && (
                  <div className="absolute top-full left-0 mt-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl shadow-lg p-1.5 min-w-[190px] z-50">
                    {item.children.map(c => (
                      <Link key={c.href} href={c.href} onClick={() => setDrop(null)}
                        className="block px-4 py-2.5 text-[13px] text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--bg-surface)] rounded-lg transition-colors">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/sale" className="px-3.5 py-2 text-[13px] font-semibold text-[var(--brand-dk)] hover:bg-[var(--brand)]/10 rounded-md transition-all">
              🔥 Розпродаж
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto">
            <Link href="/compare" className="hidden sm:flex w-9 h-9 items-center justify-center text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--bg-surface)] rounded-lg transition-all">
              <GitCompare size={17} />
            </Link>

            {/* Theme toggle */}
            <button onClick={toggle}
              className="w-9 h-9 flex items-center justify-center text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--bg-surface)] rounded-lg transition-all"
              aria-label="Змінити тему">
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>

            <Link href="/cart" className="relative flex w-9 h-9 items-center justify-center text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--bg-surface)] rounded-lg transition-all">
              <ShoppingBag size={17} />
              {count > 0 && (
                <span className="absolute top-1 right-1 min-w-[17px] h-[17px] bg-[var(--brand)] text-[#111] text-[9px] font-black rounded-full flex items-center justify-center px-1 animate-[popIn_.2s_cubic-bezier(.34,1.56,.64,1)_both]">
                  {count}
                </span>
              )}
            </Link>

            <button className="lg:hidden flex w-9 h-9 items-center justify-center text-[var(--text-3)] hover:text-[var(--text)] rounded-lg transition-all"
              onClick={() => setOpen(!open)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-x-0 top-[104px] bottom-0 z-40 bg-[var(--bg)] border-r border-[var(--border)] transition-transform duration-300 overflow-y-auto ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="p-5 flex flex-col gap-1">
          {NAV.map(item => (
            <div key={item.label}>
              {item.children && (
                <p className="text-[10px] font-bold tracking-[.1em] uppercase text-[var(--text-3)] px-2 pt-4 pb-1">{item.label}</p>
              )}
              {item.children
                ? item.children.map(c => (
                    <Link key={c.href} href={c.href} onClick={() => setOpen(false)}
                      className="block px-3 py-3 text-[15px] text-[var(--text-2)] hover:text-[var(--text)] border-b border-[var(--border)] transition-colors last:border-0">
                      {c.label}
                    </Link>
                  ))
                : (
                  <Link href={item.href} onClick={() => setOpen(false)}
                    className={`block px-3 py-3 text-[15px] border-b border-[var(--border)] transition-colors ${isActive(item.href) ? 'text-[var(--text)] font-medium' : 'text-[var(--text-2)] hover:text-[var(--text)]'}`}>
                    {item.label}
                  </Link>
                )
              }
            </div>
          ))}
          <Link href="/sale" onClick={() => setOpen(false)}
            className="block px-3 py-3 text-[15px] font-semibold text-[var(--brand-dk)] border-b border-[var(--border)]">
            🔥 Розпродаж
          </Link>
          <div className="flex gap-3 pt-5">
            <Link href="/cart" className="btn-primary flex-1 justify-center" onClick={() => setOpen(false)}>
              <ShoppingBag size={15} /> Кошик {count > 0 && `(${count})`}
            </Link>
            <button onClick={toggle} className="w-12 flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg text-[var(--text-2)] transition-colors">
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>
          </div>
        </nav>
      </div>
      {open && <div className="lg:hidden fixed inset-0 z-30 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />}
    </>
  )
}
