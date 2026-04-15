import Link from 'next/link'
import { GitCompare } from 'lucide-react'

const ROWS = [
  { name:'Ausom L1',          speed:'45', range:'50', price:'₴27 050', best:false },
  { name:'Ausom L2 Dual',     speed:'55', range:'70', price:'₴32 200', best:false },
  { name:'Ausom L2 Max Dual', speed:'55', range:'85', price:'₴40 800', best:false },
  { name:'Ausom DT2 Pro',     speed:'65', range:'70', price:'₴44 250', best:true },
]

export default function CompareCTA() {
  return (
    <section style={{ padding:'88px 0', background:'var(--bg)', borderTop:'1px solid var(--border)' }}>
      <div className="w-container">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
          <div>
            <div className="s-label">Інструмент вибору</div>
            <h2 style={{ fontSize:'clamp(28px,3.5vw,44px)', fontWeight:800, letterSpacing:'-.025em', color:'var(--text)', marginBottom:16, lineHeight:1.1 }}>
              Порівняй <span style={{ color:'var(--yellow-dark)' }}>моделі</span>
            </h2>
            <p style={{ fontSize:15, color:'var(--text-3)', lineHeight:1.7, maxWidth:380, marginBottom:32 }}>
              Не знаєш яку модель обрати? Інтерактивне порівняння допоможе знайти ідеальний варіант.
            </p>
            <Link href="/compare" className="btn btn-black">
              <GitCompare size={16}/> Порівняти моделі
            </Link>
          </div>

          <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', background:'var(--bg-subtle)', borderBottom:'1px solid var(--border)' }}>
              {['Модель','Швидк.','Пробіг','Ціна'].map(h => (
                <div key={h} style={{ padding:'10px 14px', fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--text-3)' }}>{h}</div>
              ))}
            </div>
            {ROWS.map(r => (
              <div key={r.name} style={{
                display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr',
                borderBottom:'1px solid var(--border)',
                background: r.best ? '#FFFBEA' : 'var(--bg)',
              }}>
                <div style={{ padding:'12px 14px', fontSize:13, fontWeight: r.best ? 700 : 500, color: r.best ? 'var(--yellow-dark)' : 'var(--text)', borderRight:'1px solid var(--border)' }}>{r.name}</div>
                <div style={{ padding:'12px 14px', fontSize:13, color:'var(--text-2)', borderRight:'1px solid var(--border)' }}>{r.speed} км/г</div>
                <div style={{ padding:'12px 14px', fontSize:13, color:'var(--text-2)', borderRight:'1px solid var(--border)' }}>{r.range} км</div>
                <div style={{ padding:'12px 14px', fontSize:13, fontWeight: r.best ? 700 : 500, color: r.best ? 'var(--yellow-dark)' : 'var(--text)' }}>{r.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
