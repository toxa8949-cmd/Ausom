'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BookOpen, ArrowRight } from 'lucide-react'

const CATS = ['Всі','Огляди','Гід покупця','Порівняння','Поради']

const POSTS = [
  { slug:'best-scooters-heavy-adults-2026', cat:'Огляди',     date:'30 берез. 2026', read:6,  featured:true,
    title:'Найкращі електросамокати для важких дорослих у 2026',
    excerpt:'Шукаєш самокат з великим навантаженням? Гід по топ-моделях з подвійним мотором та посиленою рамою.' },
  { slug:'10-features-buying-scooter', cat:'Гід покупця', date:'30 берез. 2026', read:8,  featured:false,
    title:'10 ключових характеристик при виборі електросамоката',
    excerpt:'Від потужності мотора до системи безпеки — все що потрібно знати перед покупкою.' },
  { slug:'best-adult-scooter-2026-guide', cat:'Порівняння', date:'30 берез. 2026', read:10, featured:false,
    title:'Найкращий електросамокат для дорослих 2026: повний гід',
    excerpt:'Порівнюємо потужність, запас ходу та портативність. Дізнайся чому Ausom — вибір №1.' },
  { slug:'dt2-pro-review', cat:'Огляди', date:'15 берез. 2026', read:12, featured:false,
    title:'DT2 Pro: детальний огляд позашляхового самоката',
    excerpt:'Тестуємо флагман позашляхової лінійки — перевіряємо реальний запас ходу та підвіску.' },
  { slug:'city-commuter-guide', cat:'Поради', date:'10 берез. 2026', read:7, featured:false,
    title:'Як обрати міський самокат для щоденних поїздок',
    excerpt:'Розбираємо всі нюанси вибору міського самоката для роботи та навчання.' },
  { slug:'e-scooter-maintenance-tips', cat:'Поради', date:'5 берез. 2026', read:5, featured:false,
    title:'Догляд за електросамокатом: 8 важливих порад',
    excerpt:'Як продовжити термін служби акумулятора та зберегти самокат у відмінному стані.' },
]

const ScooterIcon = ({ size = 48 }: { size?: number }) => (
  <svg viewBox="0 0 80 60" fill="none" width={size} height={size}>
    <circle cx="12" cy="48" r="10" stroke="#E8FF00" strokeWidth="3"/>
    <circle cx="68" cy="48" r="10" stroke="#E8FF00" strokeWidth="3"/>
    <path d="M12 48L22 18L52 12L68 48" stroke="#F5F5F0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity=".6"/>
    <path d="M22 18L30 6" stroke="#E8FF00" strokeWidth="3" strokeLinecap="round"/>
    <rect x="24" y="2" width="14" height="8" rx="2" fill="#E8FF00"/>
  </svg>
)

export default function BlogPage() {
  const [activeCat, setActiveCat] = useState('Всі')

  const featured  = POSTS.find(p => p.featured)!
  const secondary = POSTS.filter(p => !p.featured && (activeCat === 'Всі' || p.cat === activeCat))

  return (
    <div className="min-h-screen bg-[var(--black)]">

      {/* Header */}
      <div className="bg-[var(--mid)] border-b border-[var(--border)] py-16 text-center">
        <div className="container-wide">
          <span className="section-label justify-center">
            <BookOpen size={13}/> Блог
          </span>
          <h1 className="section-heading text-white mb-3">Поради та <span className="text-[var(--brand)]">Огляди</span></h1>
          <p className="text-[var(--muted)] text-[15px]">Все про електросамокати — від вибору до обслуговування</p>
        </div>
      </div>

      <div className="container-wide py-12">

        {/* Category pills */}
        <div className="flex items-center gap-2 flex-wrap justify-center mb-10">
          {CATS.map(c => (
            <button key={c} onClick={() => setActiveCat(c)}
              className={`px-5 py-2 text-[12px] font-bold uppercase tracking-wide rounded-full border transition-all ${
                activeCat===c ? 'bg-[var(--brand)] border-[var(--brand)] text-[var(--black)]' : 'border-[var(--border)] text-[var(--muted)] hover:text-white hover:border-white/30'
              }`}>
              {c}
            </button>
          ))}
        </div>

        {/* Featured */}
        {(activeCat === 'Всі' || activeCat === featured.cat) && (
          <Link href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 bg-[var(--mid)] border border-[var(--border)] rounded-2xl overflow-hidden mb-8 hover:border-[var(--brand)]/30 hover:-translate-y-1 transition-all duration-300">
            <div className="bg-[var(--surface)] h-64 lg:h-auto flex items-center justify-center">
              <div className="opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <ScooterIcon size={96} />
              </div>
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center gap-4">
              <span className="inline-flex text-[var(--brand)] text-[10px] font-black uppercase tracking-wider bg-[var(--brand)]/10 border border-[var(--brand)]/20 px-3 py-1.5 rounded w-fit">
                {featured.cat}
              </span>
              <h2 className="font-display text-[clamp(26px,3vw,38px)] text-white leading-tight tracking-wide group-hover:text-[var(--brand)] transition-colors">
                {featured.title}
              </h2>
              <p className="text-[var(--muted)] text-[14px] leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center gap-3 text-[12px] text-[var(--muted)]">
                <span>{featured.date}</span>
                <span className="text-[var(--border)]">·</span>
                <span>{featured.read} хв читання</span>
              </div>
              <span className="inline-flex items-center gap-2 text-[var(--brand)] text-[13px] font-bold group-hover:gap-3 transition-all">
                Читати статтю <ArrowRight size={15}/>
              </span>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {secondary.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="group bg-[var(--mid)] border border-[var(--border)] rounded-xl overflow-hidden flex flex-col hover:border-[var(--brand)]/30 hover:-translate-y-1 transition-all duration-300">
              <div className="bg-[var(--surface)] h-44 flex items-center justify-center relative">
                <div className="opacity-15 group-hover:opacity-30 transition-opacity duration-500">
                  <ScooterIcon size={64} />
                </div>
                <span className="absolute bottom-3 right-3 bg-[var(--brand)] text-[var(--black)] text-[10px] font-black px-2 py-0.5 rounded">{post.read} хв</span>
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <span className="text-[var(--brand)] text-[10px] font-black uppercase tracking-wider">{post.cat}</span>
                <h3 className="text-[15px] font-semibold text-white leading-snug group-hover:text-[var(--brand)] transition-colors">{post.title}</h3>
                <p className="text-[var(--muted)] text-[13px] leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-[11px] text-[var(--muted)]">
                  <span>{post.date}</span>
                  <span className="text-[var(--brand)] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-[var(--mid)] border border-[var(--border)] rounded-2xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--brand)]" />
          <div>
            <h3 className="font-display text-[clamp(28px,3vw,38px)] text-white tracking-wide mb-2">Будь у курсі</h3>
            <p className="text-[var(--muted)] text-[14px]">Нові статті, огляди та ексклюзивні знижки — першим.</p>
          </div>
          <form className="flex gap-3" onSubmit={e=>e.preventDefault()}>
            <input type="email" required placeholder="твій@email.com"
              className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3 text-[14px] text-white placeholder:text-[var(--muted)] outline-none focus:border-[var(--brand)] transition-colors" />
            <button type="submit" className="btn-primary shrink-0">Підписатися</button>
          </form>
        </div>
      </div>
    </div>
  )
}
