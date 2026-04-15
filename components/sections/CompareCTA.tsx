import Link from 'next/link'
import { GitCompare } from 'lucide-react'

const ROWS = [
  { model:'Ausom L1',          speed:'45 км/г', range:'50 км', price:'₴27 050' },
  { model:'Ausom L2 Dual',     speed:'55 км/г', range:'70 км', price:'₴32 200' },
  { model:'Ausom L2 Max Dual', speed:'55 км/г', range:'85 км', price:'₴40 800' },
  { model:'Ausom DT2 Pro',     speed:'65 км/г', range:'70 км', price:'₴44 250' },
]

export default function CompareCTA() {
  return (
    <section className="py-24 bg-[var(--black)] relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[180px] text-white/[.02] leading-none pointer-events-none select-none">AUSOM</div>
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="section-label">Інструмент вибору</span>
            <h2 className="section-heading text-white mb-4">Порівняй <span className="text-[var(--brand)]">Моделі</span></h2>
            <p className="text-[var(--muted)] text-[15px] leading-relaxed mb-8 max-w-md">
              Не знаєш яку модель обрати? Скористайся нашим інтерактивним порівнянням і знайди ідеальний самокат.
            </p>
            <Link href="/compare" className="btn-primary">
              <GitCompare size={16}/> Порівняти моделі
            </Link>
          </div>

          {/* Mini table */}
          <div className="bg-[var(--mid)] border border-[var(--border)] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 text-[10px] font-bold uppercase tracking-[.08em] text-[var(--muted)] bg-[var(--surface)] border-b border-[var(--border)]">
              {['Модель','Швид.','Пробіг','Ціна'].map(h => <div key={h} className="px-4 py-3">{h}</div>)}
            </div>
            {ROWS.map((r,i) => (
              <div key={r.model} className={`grid grid-cols-4 text-[13px] border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface)] transition-colors ${i===3 ? 'text-[var(--brand)]' : 'text-white'}`}>
                <div className="px-4 py-3.5 font-medium truncate">{r.model}</div>
                <div className="px-4 py-3.5 text-[var(--light)]">{r.speed}</div>
                <div className="px-4 py-3.5 text-[var(--light)]">{r.range}</div>
                <div className="px-4 py-3.5 font-display text-[15px] tracking-wide">{r.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
