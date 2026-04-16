'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function TrackPage() {
  const [num, setNum] = useState('')
  const [searched, setSearched] = useState(false)

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'16px 0' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)' }}>
            <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
            <ChevronRight size={13}/><span style={{ color:'var(--text)', fontWeight:500 }}>Відстежити замовлення</span>
          </div>
        </div>
      </div>
      <div style={{ padding:'56px 0 72px' }}>
        <div className="w-container" style={{ maxWidth:640 }}>
          <div style={{ textAlign:'center', marginBottom:32 }}>
            <div className="s-label" style={{ justifyContent:'center' }}>Відстеження</div>
            <h1 style={{ fontSize:'clamp(28px,3vw,40px)', fontWeight:800, letterSpacing:'-.025em', color:'var(--text)', marginBottom:12 }}>
              Відстежити <span style={{ color:'var(--yellow-dark)' }}>замовлення</span>
            </h1>
            <p style={{ fontSize:15, color:'var(--text-2)' }}>Введіть номер замовлення або ТТН</p>
          </div>

          <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'24px', marginBottom:24 }}>
            <form onSubmit={e => { e.preventDefault(); if(num.trim()) setSearched(true) }} style={{ display:'flex', gap:10 }}>
              <input value={num} onChange={e => { setNum(e.target.value); setSearched(false) }} placeholder="AU-12345 або ТТН" style={{ flex:1, background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:8, padding:'12px 16px', fontSize:14, color:'var(--text)', fontFamily:'Inter,sans-serif', outline:'none' }}/>
              <button type="submit" className="btn btn-yellow">Знайти</button>
            </form>
          </div>

          {searched && (
            <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'40px 28px', textAlign:'center' }}>
              <div style={{ fontSize:40, marginBottom:12, opacity:.4 }}>📦</div>
              <h2 style={{ fontSize:20, fontWeight:700, color:'var(--text)', marginBottom:8 }}>Замовлення не знайдено</h2>
              <p style={{ fontSize:14, color:'var(--text-3)', marginBottom:24 }}>Перевірте номер або зв&apos;яжіться з підтримкою.</p>
              <div style={{ display:'flex', justifyContent:'center', gap:10 }}>
                <Link href="/contact" className="btn btn-yellow btn-sm">Написати підтримці</Link>
                <a href="tel:+380670000000" className="btn btn-white btn-sm">📞 Зателефонувати</a>
              </div>
            </div>
          )}

          <div style={{ marginTop:28 }}>
            <h3 style={{ fontSize:15, fontWeight:700, color:'var(--text)', marginBottom:12 }}>Також відстежити через:</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {[
                { name:'Нова Пошта', url:'https://novaposhta.ua/tracking', icon:'📦', host:'novaposhta.ua' },
                { name:'Укрпошта', url:'https://track.ukrposhta.ua/tracking_UA.html', icon:'✉️', host:'ukrposhta.ua' },
              ].map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', gap:12, background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:10, padding:'16px 18px', textDecoration:'none', transition:'border-color .15s' }}>
                  <span style={{ fontSize:22 }}>{s.icon}</span>
                  <div><div style={{ fontSize:14, fontWeight:600, color:'var(--text)' }}>{s.name}</div><div style={{ fontSize:11, color:'var(--text-3)' }}>{s.host}</div></div>
                  <span style={{ marginLeft:'auto', color:'var(--text-4)' }}>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
