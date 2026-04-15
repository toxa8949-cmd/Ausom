import Link from 'next/link'

const CATS = [
  { title:'Позашляхові', sub:'Для бездоріжжя та пригод', href:'/catalog?category=offroad', emoji:'🏔️' },
  { title:'Міські',      sub:'Для щоденних поїздок',     href:'/catalog?category=commuter', emoji:'🏙️' },
  { title:'Топ Акції',   sub:'Знижки до −₴11 050',       href:'/catalog?filter=sale',       emoji:'🔥' },
]

export default function Categories() {
  return (
    <section className="py-20 bg-[var(--mid)] border-y border-[var(--border)]">
      <div className="container-wide">
        <div className="mb-10">
          <span className="section-label">Категорії</span>
          <h2 className="section-heading text-white">Де ти <span className="text-[var(--brand)]">Їдеш?</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CATS.map(c => (
            <Link key={c.href} href={c.href}
              className="group bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 flex flex-col gap-4 hover:border-[var(--brand)]/30 hover:-translate-y-1 transition-all duration-300">
              <span className="text-4xl">{c.emoji}</span>
              <div>
                <h3 className="font-display text-[28px] text-white tracking-wide leading-none mb-1">{c.title}</h3>
                <p className="text-[13px] text-[var(--muted)]">{c.sub}</p>
              </div>
              <span className="text-[var(--brand)] text-[12px] font-bold uppercase tracking-wide group-hover:gap-2 flex items-center gap-1 transition-all">
                Дивитись →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
