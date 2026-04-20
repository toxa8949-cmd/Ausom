'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const COLS = {
  'Продукти': [
    { href:'/product/l1',          label:'Ausom L1' },
    { href:'/product/l2-dual',     label:'Ausom L2 Dual' },
    { href:'/product/l2-max-dual', label:'L2 Max Dual Motor' },
    { href:'/product/dt2-pro',     label:'DT2 Pro' },
    { href:'/compare',             label:'Порівняти моделі' },
    { href:'/sale',                label:'🔥 Розпродаж' },
  ],
  'Сервіс': [
    { href:'/track',    label:'Відстежити замовлення' },
    { href:'/shipping', label:'Доставка та оплата' },
    { href:'/returns',  label:'Повернення та обмін' },
    { href:'/warranty', label:'Гарантія' },
    { href:'/faq',      label:'FAQ' },
  ],
  'Компанія': [
    { href:'/about',     label:'Про нас' },
    { href:'/blog',      label:'Блог' },
    { href:'/affiliate', label:'Партнерство' },
    { href:'/loyalty',   label:'Програма лояльності' },
    { href:'/contact',   label:'Контакти' },
    { href:'/privacy',   label:'Конфіденційність' },
  ],
}

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false)
  return (
    <footer style={{ background:'#F9F9F9', borderTop:'1px solid var(--border)' }}>
      <div className="w-container footer-inner">

        {/* Top: brand + nav columns */}
        <div className="footer-top-grid">

          {/* Brand */}
          <div>
            <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:8, textDecoration:'none', marginBottom:16 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill="#F5C200"/>
              </svg>
              <span style={{ fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:16, letterSpacing:'-.02em', color:'#111' }}>AUSOM</span>
              <sup style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:8, color:'#D4A800', marginTop:-6 }}>UA</sup>
            </Link>
            <p style={{ fontSize:13, color:'#888', lineHeight:1.7, maxWidth:240, marginBottom:24 }}>
              Офіційний дистриб&apos;ютор Ausom в Україні. Найкращі електросамокати для міста та бездоріжжя.
            </p>
            <div style={{ display:'flex', gap:8 }}>
              {['X','FB','IG','TK','YT'].map(s => (
                <a key={s} href="#" aria-label={s} style={{
                  width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:10, fontWeight:700, color:'#888',
                  background:'#fff', border:'1px solid #E8E8E8', borderRadius:6,
                  textDecoration:'none', transition:'all .15s',
                }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#D4A800';(e.currentTarget as HTMLElement).style.color='#D4A800'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='#E8E8E8';(e.currentTarget as HTMLElement).style.color='#888'}}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(COLS).map(([title, links]) => (
            <div key={title}>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:'#111', marginBottom:20 }}>{title}</p>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:12 }}>
                {links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} style={{ fontSize:13, color:'#888', textDecoration:'none', transition:'color .15s' }}
                    onMouseEnter={e=>(e.currentTarget.style.color='#111')}
                    onMouseLeave={e=>(e.currentTarget.style.color='#888')}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter-row">
          <div>
            <p style={{ fontSize:18, fontWeight:800, letterSpacing:'-.015em', color:'#111', marginBottom:4 }}>Розсилка</p>
            <p style={{ fontSize:13, color:'#888' }}>Ексклюзивні знижки та нові моделі — першим.</p>
          </div>
          <form className="footer-newsletter-form" style={{ display:'flex', gap:8 }} onSubmit={e=>{e.preventDefault();setSubscribed(true)}}>
            <input type="email" required placeholder="твій@email.com" aria-label="Email для розсилки" style={{
              width:240, padding:'11px 16px',
              background:'#fff', border:'1.5px solid #E8E8E8', borderRadius:6,
              fontSize:13, color:'#111', outline:'none', fontFamily:'Inter,sans-serif',
              transition:'border-color .15s',
            }}
            onFocus={e=>(e.target.style.borderColor='#F5C200')}
            onBlur={e=>(e.target.style.borderColor='#E8E8E8')}/>
            {!subscribed && <button type="submit" className="btn btn-yellow btn-sm">Підписатись</button>}
          </form>
          {subscribed && <p style={{ fontSize:13, color:'#22C55E', fontWeight:600, marginTop:8, alignSelf:'center' }}>✅ Ви підписані!</p>}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <p style={{ fontSize:12, color:'#BBBBBB' }}>© 2026 Ausom Ukraine. Всі права захищені.</p>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {['VISA','Mastercard','Privat24','Monobank','PayPal'].map(p => (
              <span key={p} style={{ fontSize:10, fontWeight:600, color:'#BBBBBB', background:'#fff', border:'1px solid #E8E8E8', padding:'4px 10px', borderRadius:4 }}>{p}</span>
            ))}
          </div>
          <div style={{ display:'flex', gap:20 }}>
            <Link href="/privacy" style={{ fontSize:12, color:'#BBBBBB', textDecoration:'none' }}
            onMouseEnter={e=>(e.currentTarget.style.color='#111')}
            onMouseLeave={e=>(e.currentTarget.style.color='#BBBBBB')}>Конфіденційність</Link>
            <Link href="/terms" style={{ fontSize:12, color:'#BBBBBB', textDecoration:'none' }}
            onMouseEnter={e=>(e.currentTarget.style.color='#111')}
            onMouseLeave={e=>(e.currentTarget.style.color='#BBBBBB')}>Умови</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
