'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const POSTS = [
  { slug:'best-scooters-heavy-adults-2026', cat:'Огляди',     date:'30 берез.', read:6,
    title:'Найкращі самокати для важких дорослих у 2026',
    excerpt:'Гід по топ-моделях з подвійним мотором та посиленою рамою.' },
  { slug:'10-features-buying-scooter',      cat:'Гід покупця', date:'30 берез.', read:8,
    title:'10 характеристик при виборі електросамоката',
    excerpt:'Від потужності мотора до системи безпеки — все перед покупкою.' },
  { slug:'best-adult-scooter-2026-guide',   cat:'Порівняння', date:'30 берез.', read:10,
    title:'Найкращий самокат для дорослих 2026: повний гід',
    excerpt:'Порівнюємо потужність, запас ходу та портативність.' },
]

export default function BlogPreview() {
  return (
    <section className="home-section" style={{ padding:'88px 0', background:'var(--bg-soft)', borderTop:'1px solid var(--border)' }}>
      <div className="w-container">
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:32 }}>
          <div>
            <div className="s-label">Блог</div>
            <h2 style={{ fontSize:'clamp(22px,3vw,42px)', fontWeight:800, letterSpacing:'-.02em', color:'var(--text)' }}>
              Поради та <span style={{ color:'var(--yellow-dark)' }}>огляди</span>
            </h2>
          </div>
          <Link href="/blog" style={{ display:'flex', alignItems:'center', gap:6, fontSize:14, fontWeight:600, color:'var(--text-2)', textDecoration:'none' }}>
            Всі статті <ArrowRight size={15}/>
          </Link>
        </div>
        <div className="home-blog-grid">
          {POSTS.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration:'none' }}>
              <div style={{
                background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:12,
                overflow:'hidden', transition:'transform .2s, box-shadow .2s', height:'100%',
              }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(-4px)';(e.currentTarget as HTMLElement).style.boxShadow='var(--shadow-lg)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='none';(e.currentTarget as HTMLElement).style.boxShadow='none'}}>
                <div style={{ height:160, background:'var(--bg-subtle)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
                  <svg viewBox="0 0 120 90" fill="none" width="70" height="52" style={{ opacity:.2 }}>
                    <circle cx="22" cy="72" r="16" stroke="#F5C200" strokeWidth="4"/>
                    <circle cx="98" cy="72" r="16" stroke="#F5C200" strokeWidth="4"/>
                    <path d="M22 72L38 28L76 20L98 72" stroke="#111" strokeWidth="5" strokeLinecap="round"/>
                    <path d="M38 28L48 8" stroke="#F5C200" strokeWidth="4" strokeLinecap="round"/>
                    <rect x="42" y="2" width="20" height="10" rx="2.5" fill="#F5C200"/>
                  </svg>
                  <span style={{
                    position:'absolute', bottom:10, right:10,
                    background:'#F5C200', color:'#111', fontSize:9, fontWeight:800,
                    padding:'3px 7px', borderRadius:3,
                  }}>{post.read} хв</span>
                </div>
                <div style={{ padding:'18px' }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--yellow-dark)', marginBottom:8 }}>{post.cat}</div>
                  <h3 style={{ fontSize:15, fontWeight:700, color:'var(--text)', lineHeight:1.35, marginBottom:8, letterSpacing:'-.01em' }}>{post.title}</h3>
                  <p style={{ fontSize:13, color:'var(--text-3)', lineHeight:1.6, marginBottom:14 }}>{post.excerpt}</p>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:12, borderTop:'1px solid var(--border)', fontSize:11, color:'var(--text-4)' }}>
                    <span>{post.date}</span>
                    <span style={{ color:'var(--yellow-dark)', fontWeight:600 }}>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
