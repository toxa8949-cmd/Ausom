'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, Search, Heart, Menu, X, ChevronDown } from 'lucide-react'
import { useCart } from '@/lib/cart'

const NAV = [
  {
    label: 'Самокати',
    href: '/catalog',
    children: [
      { label: 'Всі моделі', href: '/catalog' },
      { label: 'Позашляхові', href: '/catalog?category=offroad' },
      { label: 'Міські', href: '/catalog?category=commuter' },
      { label: '48V моделі', href: '/catalog?voltage=48v' },
      { label: '52V моделі', href: '/catalog?voltage=52v' },
      { label: '60V моделі', href: '/catalog?voltage=60v' },
      { label: 'Новинки 2026', href: '/catalog?filter=new' },
      { label: '⚖ Порівняти моделі', href: '/compare' },
    ],
  },
  { label: 'Запчастини', href: '/parts' },
  {
    label: 'Про нас',
    href: '/about',
    children: [
      { label: 'Про компанію', href: '/about' },
      { label: 'Сервісний центр', href: '/service' },
      { label: 'Контакти', href: '/contact' },
    ],
  },
  { label: 'Блог', href: '/blog' },
]

export default function Header() {
  const { count } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDrop, setOpenDrop] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-[#0b0b0b] border-b border-white/5">
      <div className="container-wide flex items-center h-16 gap-8">

        {/* Logo */}
        <Link href="/" className="font-display text-2xl tracking-widest text-white shrink-0">
          AUSOM <span className="text-[#ff5c00]">UA</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 flex-1">
          {NAV.map(item => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => item.children && setOpenDrop(item.label)}
              onMouseLeave={() => setOpenDrop(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-white/75 hover:text-white hover:bg-white/8 rounded-md transition-all"
              >
                {item.label}
                {item.children && <ChevronDown size={13} className="opacity-50 group-hover:opacity-100 transition-transform group-hover:rotate-180" />}
              </Link>

              {item.children && openDrop === item.label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-[#e8e8e5] rounded-xl shadow-2xl p-2 min-w-[220px] z-50">
                  {item.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2.5 text-sm text-[#444440] hover:bg-[#f4f4f2] hover:text-black rounded-lg transition-colors font-medium"
                      onClick={() => setOpenDrop(null)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            href="/sale"
            className="px-3.5 py-2 text-sm font-medium text-[#ff5c00] hover:text-[#ff7a2b] hover:bg-[#ff5c00]/10 rounded-md transition-all"
          >
            🔥 Розпродаж
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-auto">
          <button className="hidden sm:flex w-9 h-9 items-center justify-center text-white/70 hover:text-white hover:bg-white/8 rounded-lg transition-all">
            <Search size={18} />
          </button>
          <button className="hidden sm:flex w-9 h-9 items-center justify-center text-white/70 hover:text-white hover:bg-white/8 rounded-lg transition-all">
            <Heart size={18} />
          </button>
          <Link href="/cart" className="relative flex w-9 h-9 items-center justify-center text-white/70 hover:text-white hover:bg-white/8 rounded-lg transition-all">
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#ff5c00] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {/* Burger */}
          <button
            className="lg:hidden flex w-9 h-9 items-center justify-center text-white/70 hover:text-white rounded-lg transition-all ml-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0b0b0b] border-t border-white/5 px-6 py-4 flex flex-col gap-1">
          {NAV.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white/75 hover:text-white py-3 border-b border-white/5 text-base font-medium transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/sale" className="text-[#ff5c00] py-3 text-base font-medium" onClick={() => setMobileOpen(false)}>
            🔥 Розпродаж
          </Link>
        </div>
      )}
    </header>
  )
}
