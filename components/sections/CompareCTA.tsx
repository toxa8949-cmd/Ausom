import Link from 'next/link'

const ROWS = [
  { model: 'L1', speed: '45 км/г', range: '50 км', price: '27 050 ₴' },
  { model: 'L2 Dual Motor', speed: '55 км/г', range: '70 км', price: '32 200 ₴' },
  { model: 'L2 Max Dual', speed: '55 км/г', range: '85 км', price: '40 800 ₴' },
  { model: 'DT2 Pro', speed: '65 км/г', range: '70 км', price: '44 250 ₴' },
]

export default function CompareCTA() {
  return (
    <section className="bg-[#0b0b0b] py-24 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,92,0,.1),transparent_60%)] pointer-events-none" />
      {/* Big watermark */}
      <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 font-display text-[220px] text-white/[.025] leading-none pointer-events-none select-none">
        AUSOM
      </div>

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <span className="section-label">Інструмент вибору</span>
            <h2 className="section-heading text-white mb-6">
              Порівняй <span className="text-[#ff5c00]">Моделі</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">
              Не знаєш яку модель обрати? Скористайся нашим інтерактивним порівнянням і знайди ідеальний самокат під свої потреби та бюджет.
            </p>
            <Link href="/compare" className="btn-primary">
              Порівняти моделі →
            </Link>
          </div>

          {/* Table */}
          <div className="bg-white/[.04] border border-white/[.08] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 border-b border-white/[.07] px-5 py-3.5">
              {['Модель', 'Швид.', 'Пробіг', 'Ціна'].map(h => (
                <div key={h} className="text-[10px] font-bold uppercase tracking-[.12em] text-white/30 text-center first:text-left">
                  {h}
                </div>
              ))}
            </div>
            {ROWS.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-4 px-5 py-3.5 border-b border-white/[.05] last:border-0 hover:bg-white/[.03] transition-colors"
              >
                <div className="text-sm font-semibold text-white/90">{row.model}</div>
                <div className="text-sm text-white/55 text-center">{row.speed}</div>
                <div className="text-sm text-white/55 text-center">{row.range}</div>
                <div className="text-sm font-bold text-[#ff5c00] text-center">{row.price}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
