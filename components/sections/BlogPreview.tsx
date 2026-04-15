import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

const POSTS = [
  { slug:'best-scooters-heavy-adults-2026', cat:'Огляди',    date:'30 берез. 2026', read:6,
    title:'Найкращі електросамокати для важких дорослих у 2026',
    excerpt:'Шукаєш самокат з великим навантаженням? Гід по топ-моделях з подвійним мотором.' },
  { slug:'10-features-buying-scooter', cat:'Гід покупця', date:'30 берез. 2026', read:8,
    title:'10 ключових характеристик при виборі електросамоката',
    excerpt:'Від потужності мотора до системи безпеки — все що потрібно знати перед покупкою.' },
  { slug:'best-adult-scooter-2026-guide', cat:'Порівняння', date:'30 берез. 2026', read:10,
    title:'Найкращий електросамокат для дорослих 2026: повний гід',
    excerpt:'Порівнюємо потужність, запас ходу та портативність. Чому Ausom — вибір №1.' },
]

export default function BlogPreview() {
  return (
    <section className="py-24 bg-[var(--bg-mid)] border-y border-[var(--border)]">
      <div className="container-wide">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="section-label"><BookOpen size={12}/> Блог</span>
            <h2 className="section-heading">Поради та <span className="text-[var(--brand-dk)]">Огляди</span></h2>
          </div>
          <Link href="/blog" className="btn-ghost flex items-center gap-1.5 text-[var(--brand-dk)] font-semibold">
            Всі статті <ArrowRight size={15}/>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {POSTS.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="group bg-[var(--bg)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--brand)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="bg-[var(--bg-surface)] h-44 flex items-center justify-center relative">
                <svg viewBox="0 0 80 60" fill="none" width="56" height="42" className="opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <circle cx="12" cy="48" r="10" stroke="var(--brand)"   strokeWidth="3"/>
                  <circle cx="68" cy="48" r="10" stroke="var(--brand)"   strokeWidth="3"/>
                  <path d="M12 48L22 18L52 12L68 48" stroke="var(--text)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity=".6"/>
                  <path d="M22 18L30 6" stroke="var(--brand)" strokeWidth="3" strokeLinecap="round"/>
                  <rect x="24" y="2" width="14" height="8" rx="2" fill="var(--brand)"/>
                </svg>
                <span className="absolute bottom-3 right-3 bg-[var(--brand)] text-[#111] text-[9px] font-black px-2 py-0.5 rounded">{post.read} хв</span>
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <span className="text-[var(--brand-dk)] text-[10px] font-black uppercase tracking-wider">{post.cat}</span>
                <h3 className="text-[14px] font-semibold text-[var(--text)] leading-snug group-hover:text-[var(--brand-dk)] transition-colors">{post.title}</h3>
                <p className="text-[12px] text-[var(--text-3)] leading-relaxed flex-1 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-[11px] text-[var(--text-3)]">
                  <span>{post.date}</span>
                  <span className="text-[var(--brand-dk)] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
