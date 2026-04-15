import Link from 'next/link'
import { GitCompare } from 'lucide-react'

const ROWS = [
  { model:'Ausom L1',          speed:'45 км/г', range:'50 км', price:'₴27 050', best:false },
  { model:'Ausom L2 Dual',     speed:'55 км/г', range:'70 км', price:'₴32 200', best:false },
  { model:'Ausom L2 Max Dual', speed:'55 км/г', range:'85 км', price:'₴40 800', best:false },
  { model:'Ausom DT2 Pro',     speed:'65 км/г', range:'70 км', price:'₴44 250', best:true  },
]

export default function CompareCTA() {
  return (
    <section className="py-24 bg-[var(--bg)] relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[180px] text-[var(--text)]/[.025] leading-none pointer-events-none select-none">AUSOM</div>
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="section-label">Інструмент вибору</span>
            <h2 className="section-heading mb-4">Порівняй <span className="text-[var(--brand-dk)]">Моделі</span></h2>
            <p className="text-[var(--text-2)] text-[15px] leading-relaxed mb-8 max-w-md">
              Не знаєш яку модель обрати? Скористайся нашим інтерактивним порівнянням.
            </p>
            <Link href="/compare" className="btn-primary"><GitCompare size={16}/> Порівняти моделі</Link>
          </div>
          <div className="bg-[var(--bg-mid)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-4 text-[10px] font-bold uppercase tracking-[.08em] text-[var(--text-3)] bg-[var(--bg-surface)] border-b border-[var(--border)]">
              {['Модель','Швид.','Пробіг','Ціна'].map(h => <div key={h} className="px-4 py-3">{h}</div>)}
            </div>
            {ROWS.map(r => (
              <div key={r.model} className={`grid grid-cols-4 text-[13px] border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-surface)] transition-colors ${r.best ? 'font-semibold' : ''}`}>
                <div className={`px-4 py-3.5 truncate ${r.best ? 'text-[var(--brand-dk)]' : 'text-[var(--text)]'}`}>{r.model}</div>
                <div className="px-4 py-3.5 text-[var(--text-2)]">{r.speed}</div>
                <div className="px-4 py-3.5 text-[var(--text-2)]">{r.range}</div>
                <div className={`px-4 py-3.5 font-display text-[15px] tracking-wide ${r.best ? 'text-[var(--brand-dk)]' : 'text-[var(--text)]'}`}>{r.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
