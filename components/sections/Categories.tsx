'use client'

import Link from 'next/link'

const CATS = [
  { emoji:'🏔️', title:'Позашляхові', sub:'Для бездоріжжя та пригод', href:'/catalog?category=offroad', dark:true },
  { emoji:'🏙️', title:'Міські',      sub:'Для щоденних поїздок',     href:'/catalog?category=commuter', dark:false },
  { emoji:'🔥', title:'Розпродаж',   sub:'Знижки до −₴11 050',       href:'/sale', dark:false },
]

export default function Categories() {
  return (
    <section className="home-section" style={{ padding:'72px 0', background:'var(--bg-soft)', borderTop:'1px solid var(--border)' }}>
      <div className="w-container">
        <div style={{ marginBottom:32 }}>
          <div className="s-label">Категорії</div>
          <h2 style={{ fontSize:'clamp(22px,3vw,42px)', fontWeight:800, letterSpacing:'-.02em', color:'var(--text)' }}>
            Де ти <span style={{ color:'var(--yellow-dark)' }}>їдеш?</span>
          </h2>
        </div>
        <div className="home-categories">
          {CATS.map(c => (
            <Link key={c.href} href={c.href} style={{ textDecoration:'none' }}>
              <div style={{
                padding:'32px 24px',
                background: c.dark ? '#111' : 'var(--bg)',
                border:'1.5px solid var(--border)',
                borderRadius:12,
                transition:'transform .2s, box-shadow .2s',
                cursor:'pointer',
              }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(-4px)';(e.currentTarget as HTMLElement).style.boxShadow='var(--shadow-lg)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='none';(e.currentTarget as HTMLElement).style.boxShadow='none'}}>
                <div style={{ fontSize:36, marginBottom:14 }}>{c.emoji}</div>
                <h3 style={{ fontSize:'clamp(18px,2.5vw,22px)', fontWeight:800, letterSpacing:'-.02em', color: c.dark ? '#fff' : 'var(--text)', marginBottom:6 }}>{c.title}</h3>
                <p style={{ fontSize:13, color: c.dark ? 'rgba(255,255,255,.5)' : 'var(--text-3)', marginBottom:18 }}>{c.sub}</p>
                <span style={{ fontSize:12, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase', color:'#F5C200', display:'flex', alignItems:'center', gap:6 }}>
                  Переглянути →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
