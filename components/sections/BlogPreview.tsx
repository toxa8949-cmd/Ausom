import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

const POSTS = [
  { slug:'best-scooters-heavy-adults-2026', cat:'Огляди',     date:'30 берез. 2026', read:6,
    title:'Найкращі електросамокати для важких дорослих у 2026', large:true,
    excerpt:'Шукаєш самокат з великим навантаженням? Гід по топ-моделях з подвійним мотором та посиленою рамою.' },
  { slug:'10-features-buying-scooter', cat:'Гід покупця', date:'30 берез. 2026', read:8,  large:false,
    title:'10 ключових характеристик при виборі електросамоката',
    excerpt:'Від потужності мотора до системи безпеки — все що потрібно знати перед покупкою.' },
  { slug:'best-adult-scooter-2026-guide', cat:'Порівняння', date:'30 берез. 2026', read:10, large:false,
    title:'Найкращий електросамокат для дорослих 2026: повний гід',
    excerpt:'Порівнюємо потужність, запас ходу та портативність. Чому Ausom — вибір №1.' },
]

export default function BlogPreview() {
  return (
    <section className="py-24 bg-[var(--mid)] border-y border-[var(--border)]">
      <div className="container-wide">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="section-label"><BookOpen size={12}/> Блог</span>
            <h2 className="section-heading text-white">Поради та <span className="text-[var(--brand)]">Огляди</span></h2>
          </div>
          <Link href="/blog" className="btn-ghost flex items-center gap-1.5 text-[var(--brand)]">
            Всі статті <ArrowRight size={15}/>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {POSTS.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className={`group bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--brand)]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col ${i===0 ? 'lg:row-span-1' : ''}`}>
              <div className="bg-[var(--mid)] h-44 flex items-center justify-center relative">
                <svg viewBox="0 0 80 60" fill="none" width="56" height="42" className="opacity-15 group-hover:opacity-30 transition-opacity duration-500">
                  <circle cx="12" cy="48" r="10" stroke="#E8FF00" strokeWidth="3"/>
                  <circle cx="68" cy="48" r="10" stroke="#E8FF00" strokeWidth="3"/>
                  <path d="M12 48L22 18L52 12L68 48" stroke="#F5F5F0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 18L30 6" stroke="#E8FF00" strokeWidth="3" strokeLinecap="round"/>
                  <rect x="24" y="2" width="14" height="8" rx="2" fill="#E8FF00"/>
                </svg>
                <span className="absolute bottom-3 right-3 bg-[var(--brand)] text-[var(--black)] text-[9px] font-black px-2 py-0.5 rounded">{post.read} хв</span>
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <span className="text-[var(--brand)] text-[10px] font-black uppercase tracking-wider">{post.cat}</span>
                <h3 className="text-[14px] font-semibold text-white leading-snug group-hover:text-[var(--brand)] transition-colors">{post.title}</h3>
                <p className="text-[12px] text-[var(--muted)] leading-relaxed flex-1 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-[11px] text-[var(--muted)]">
                  <span>{post.date}</span>
                  <span className="text-[var(--brand)] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
