'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { useTheme } from '@/lib/theme'

const NAV = [
  {
    label: 'Самокати', href: '/catalog',
    sub: [
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
  const [open,  setOpen]  = useState(false)
  const [drop,  setDrop]  = useState<string|null>(null)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const h = () => setStuck(window.scrollY > 10)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close drawer when the route actually changes
  useEffect(() => { setOpen(false) }, [pathname])

  const active = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--bg)',
        borderBottom: `1px solid ${stuck ? 'var(--border)' : 'var(--border)'}`,
        boxShadow: stuck ? 'var(--shadow-sm)' : 'none',
        transition: 'box-shadow .2s',
      }}>
        <div className="w-container" style={{ height: 64, display: 'flex', alignItems: 'center', gap: 0 }}>

          {/* Logo */}
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:8, textDecoration:'none', flexShrink:0, marginRight:48 }}
            onClick={() => setOpen(false)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill="#F5C200" stroke="#F5C200" strokeWidth=".5"/>
            </svg>
            <span style={{ fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:18, letterSpacing:'-.02em', color:'var(--text)' }}>
              AUSOM
            </span>
            <sup style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:9, color:'var(--yellow-dark)', marginTop:-8, letterSpacing:'.04em' }}>UA</sup>
          </Link>

          {/* Desktop nav — .nav-desktop hides below 1024px via globals.css
             (replaces unreliable Tailwind v4 "hidden lg:flex") */}
          <nav className="nav-desktop" style={{ alignItems:'center', gap:4, flex:1 }}>
            {NAV.map(item => (
              <div key={item.label} style={{ position:'relative' }}
                onMouseEnter={() => item.sub && setDrop(item.label)}
                onMouseLeave={() => setDrop(null)}>
                <Link href={item.href} style={{
                  display:'flex', alignItems:'center', gap:4,
                  padding:'8px 14px', borderRadius:6, textDecoration:'none',
                  fontSize:14, fontWeight:500, letterSpacing:'-.01em',
                  color: active(item.href) ? 'var(--text)' : 'var(--text-3)',
                  background: active(item.href) ? 'var(--bg-subtle)' : 'transparent',
                  transition:'color .15s, background .15s',
                }}>
                  {item.label}
                  {item.sub && <ChevronDown size={12} style={{ opacity:.5, transform: drop===item.label ? 'rotate(180deg)' : 'none', transition:'transform .2s' }} />}
                </Link>
                {item.sub && drop===item.label && (
                  <div style={{
                    position:'absolute', top:'calc(100% + 8px)', left:0,
                    background:'var(--bg)', border:'1.5px solid var(--border)',
                    borderRadius:10, padding:6, minWidth:180,
                    boxShadow:'var(--shadow-md)', zIndex:100,
                    animation:'fadeUp .15s ease both',
                  }}>
                    {item.sub.map(c => (
                      <Link key={c.href} href={c.href} onClick={() => setDrop(null)} style={{
                        display:'block', padding:'10px 14px', borderRadius:6,
                        fontSize:13, fontWeight:500, color:'var(--text-2)',
                        textDecoration:'none', transition:'background .1s, color .1s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='var(--bg-subtle)'; (e.currentTarget as HTMLElement).style.color='var(--text)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.color='var(--text-2)' }}>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/sale" style={{ padding:'8px 14px', borderRadius:6, fontSize:14, fontWeight:600, color:'var(--yellow-dark)', textDecoration:'none' }}>
              🔥 Розпродаж
            </Link>
          </nav>

          {/* Right actions */}
          <div style={{ display:'flex', alignItems:'center', gap:4, marginLeft:'auto' }}>
            {/* Theme toggle */}
            <button onClick={toggle} aria-label="Тема" style={{
              width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center',
              background:'transparent', border:'1.5px solid var(--border)', borderRadius:6,
              color:'var(--text-3)', cursor:'pointer', transition:'all .15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--border-dark)'; (e.currentTarget as HTMLElement).style.color='var(--text)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--border)'; (e.currentTarget as HTMLElement).style.color='var(--text-3)' }}>
              {theme==='light' ? <Moon size={15}/> : <Sun size={15}/>}
            </button>

            {/* Cart */}
            <Link href="/cart" aria-label="Кошик" style={{
              position:'relative', width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center',
              background:'transparent', border:'1.5px solid var(--border)', borderRadius:6,
              color:'var(--text-3)', textDecoration:'none', transition:'all .15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--border-dark)'; (e.currentTarget as HTMLElement).style.color='var(--text)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--border)'; (e.currentTarget as HTMLElement).style.color='var(--text-3)' }}>
              <ShoppingBag size={16}/>
              {count > 0 && (
                <span style={{
                  position:'absolute', top:-4, right:-4,
                  minWidth:18, height:18, background:'#F5C200', color:'#111',
                  fontSize:10, fontWeight:800, borderRadius:9,
                  display:'flex', alignItems:'center', justifyContent:'center', padding:'0 4px',
                }}>
                  {count}
                </span>
              )}
            </Link>

            {/* Burger — .nav-burger visible only below 1024px */}
            <button
              className="nav-burger"
              aria-label={open ? 'Закрити меню' : 'Відкрити меню'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              style={{
                width:36, height:36, alignItems:'center', justifyContent:'center',
                background:'transparent', border:'1.5px solid var(--border)', borderRadius:6,
                color:'var(--text-2)', cursor:'pointer',
              }}>
              {open ? <X size={16}/> : <Menu size={16}/>}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      {open && (
        <div
          aria-hidden="true"
          style={{
            position:'fixed', inset:0, zIndex:45,
            background:'rgba(0,0,0,.4)',
            backdropFilter:'blur(4px)',
          }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer — hidden (visibility+pointer-events) when closed so it
          can't intercept clicks or cause horizontal scroll on mobile.
          See .mobile-drawer in globals.css */}
      <div
        className={`mobile-drawer${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Мобільне меню"
        style={{
          position:'fixed', top:0, right:0, bottom:0, width:300, zIndex:46,
          background:'var(--bg)', borderLeft:'1.5px solid var(--border)',
          padding:'24px 20px', display:'flex', flexDirection:'column', gap:4,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition:'transform .3s ease',
          overflowY:'auto',
        }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <span style={{ fontWeight:700, fontSize:15, color:'var(--text)' }}>Меню</span>
          <button onClick={() => setOpen(false)} aria-label="Закрити меню" style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-3)' }}><X size={18}/></button>
        </div>
        {NAV.map(item => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)} style={{
            display:'block', padding:'14px 0',
            fontSize:16, fontWeight:500, color: active(item.href) ? 'var(--text)' : 'var(--text-2)',
            textDecoration:'none', borderBottom:'1px solid var(--border)',
          }}>{item.label}</Link>
        ))}
        <Link href="/sale" onClick={() => setOpen(false)} style={{ display:'block', padding:'14px 0', fontSize:16, fontWeight:600, color:'var(--yellow-dark)', textDecoration:'none', borderBottom:'1px solid var(--border)' }}>
          🔥 Розпродаж
        </Link>
        <div style={{ marginTop:24 }}>
          <Link href="/cart" className="btn btn-black btn-full" onClick={() => setOpen(false)}>
            <ShoppingBag size={15}/> Кошик {count > 0 && `(${count})`}
          </Link>
        </div>
      </div>
    </>
  )
}
