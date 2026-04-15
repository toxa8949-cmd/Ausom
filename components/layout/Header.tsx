'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X, ChevronDown, Zap, GitCompare } from 'lucide-react'
import { useCart } from '@/lib/cart'

const NAV = [
  {
    label: 'Самокати', href: '/catalog',
    children: [
      { label: 'Всі моделі',    href: '/catalog' },
      { label: 'Позашляхові',  href: '/catalog?category=offroad' },
      { label: 'Міські',       href: '/catalog?category=commuter' },
      { label: 'Порівняти',    href: '/compare' },
    ],
  },
  { label: 'Запчастини', href: '/parts' },
  { label: 'Блог',       href: '/blog' },
  { label: 'Про нас',    href: '/about' },
]

export default function Header() {
  const pathname = usePathname()
  const { count } = useCart()
  const [open, setOpen]       = useState(false)
  const [drop, setDrop]       = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])

  const active = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      <header className={`sticky top-0 z-50 h-[68px] transition-all duration-300 ${scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[var(--border)] shadow-[0_4px_32px_rgba(0,0,0,.5)]' : 'bg-[#0A0A0A]/80 backdrop-blur-md border-b border-transparent'}`}>
        <div className="container-wide h-full flex items-center gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 font-display text-[22px] tracking-[.08em] text-[var(--snow)] hover:text-[var(--brand)] transition-colors shrink-0" onClick={() => setOpen(false)}>
            <Zap size={17} className="text-[var(--brand)]" strokeWidth={2.5} />
            AUSOM
            <sup className="font-sans text-[10px] font-bold text-[var(--brand)] tracking-normal mt-[-8px]">UA</sup>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV.map(item => (
              <div key={item.label} className="relative" onMouseEnter={() => item.children && setDrop(item.label)} onMouseLeave={() => setDrop(null)}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium rounded-md transition-all ${active(item.href) ? 'text-white bg-white/6' : 'text-[var(--light)] hover:text-white hover:bg-white/5'}`}
                >
                  {item.label}
                  {item.children && <ChevronDown size={12} className={`transition-transform duration-200 ${drop === item.label ? 'rotate-180 opacity-100' : 'opacity-50'}`} />}
                </Link>
                {active(item.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-[var(--brand)] rounded-full" />
                )}
                {item.children && drop === item.label && (
                  <div className="absolute top-full left-0 mt-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,.6)] p-1.5 min-w-[190px] animate-[fadeInUp_.15s_ease_both]">
                    {item.children.map(c => (
                      <Link key={c.href} href={c.href} onClick={() => setDrop(null)}
                        className="block px-4 py-2.5 text-[13px] text-[var(--light)] hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/sale" className="px-3.5 py-2 text-[13px] font-medium text-[var(--brand)] hover:bg-[var(--brand)]/10 rounded-md transition-all">
              🔥 Розпродаж
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto">
            <Link href="/compare" className="hidden sm:flex w-9 h-9 items-center justify-center text-[var(--light)] hover:text-white hover:bg-white/6 rounded-lg transition-all" aria-label="Порівняти">
              <GitCompare size={17} />
            </Link>
            <Link href="/cart" className="relative flex w-9 h-9 items-center justify-center text-[var(--light)] hover:text-white hover:bg-white/6 rounded-lg transition-all">
              <ShoppingBag size={17} />
              {count > 0 && (
                <span className="absolute top-1 right-1 min-w-[17px] h-[17px] bg-[var(--brand)] text-[var(--black)] text-[9px] font-black rounded-full flex items-center justify-center px-1 animate-[popIn_.2s_cubic-bezier(.34,1.56,.64,1)_both]">
                  {count}
                </span>
              )}
            </Link>
            <button className="lg:hidden flex w-9 h-9 items-center justify-center text-[var(--light)] hover:text-white rounded-lg transition-all" onClick={() => setOpen(!open)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-x-0 top-[104px] bottom-0 z-40 bg-[var(--mid)] transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
        <nav className="p-6 flex flex-col gap-1">
          {NAV.map(item => (
            <div key={item.label}>
              {item.children && <p className="text-[10px] font-bold tracking-[.1em] uppercase text-[var(--muted)] px-1 pt-4 pb-1">{item.label}</p>}
              {item.children
                ? item.children.map(c => (
                    <Link key={c.href} href={c.href} onClick={() => setOpen(false)}
                      className="block px-3 py-3 text-[15px] text-[var(--light)] hover:text-white border-b border-[var(--border)] transition-colors last:border-0">
                      {c.label}
                    </Link>
                  ))
                : (
                  <Link href={item.href} onClick={() => setOpen(false)}
                    className={`block px-3 py-3 text-[15px] border-b border-[var(--border)] transition-colors ${active(item.href) ? 'text-white' : 'text-[var(--light)] hover:text-white'}`}>
                    {item.label}
                  </Link>
                )
              }
            </div>
          ))}
          <Link href="/sale" onClick={() => setOpen(false)} className="block px-3 py-3 text-[15px] text-[var(--brand)] border-b border-[var(--border)]">
            🔥 Розпродаж
          </Link>
          <div className="pt-6">
            <Link href="/cart" className="btn-primary w-full justify-center" onClick={() => setOpen(false)}>
              <ShoppingBag size={15} /> Кошик {count > 0 && `(${count})`}
            </Link>
          </div>
        </nav>
      </div>
      {open && <div className="lg:hidden fixed inset-0 z-30 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />}
    </>
  )
}
