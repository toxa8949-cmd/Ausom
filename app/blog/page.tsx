import Link from 'next/link'

const POSTS = [
  { slug: 'best-scooters-heavy-adults-2026', category: 'Огляди', date: '30 берез. 2026', title: 'Найкращі електросамокати для важких дорослих у 2026', excerpt: 'Шукаєш самокат з великим навантаженням? Гід по топ-моделях з подвійним мотором та посиленою рамою.', bg: 'from-[#1a0500] to-[#7a2500]', readTime: 6 },
  { slug: '10-features-buying-scooter', category: 'Гід покупця', date: '30 берез. 2026', title: '10 ключових характеристик при виборі електросамоката', excerpt: 'Від потужності мотора до системи безпеки — все що потрібно знати перед покупкою.', bg: 'from-[#050d18] to-[#1a3048]', readTime: 5 },
  { slug: 'best-adult-scooter-2026-guide', category: 'Порівняння', date: '30 берез. 2026', title: 'Найкращий електросамокат для дорослих 2026: повний гід', excerpt: 'Порівнюємо потужність, запас ходу та портативність.', bg: 'from-[#080808] to-[#1f1f1f]', readTime: 8 },
  { slug: 'dt2-pro-review', category: 'Огляди', date: '15 берез. 2026', title: 'DT2 Pro: детальний огляд позашляхового самоката', excerpt: 'Тестуємо флагман позашляхової лінійки Ausom — DT2 Pro.', bg: 'from-[#1a0a00] to-[#4d1500]', readTime: 7 },
  { slug: 'city-commuter-guide', category: 'Поради', date: '10 берез. 2026', title: 'Як обрати міський самокат для щоденних поїздок', excerpt: 'Розбираємо всі нюанси вибору міського самоката для роботи та навчання.', bg: 'from-[#050d18] to-[#0d2035]', readTime: 4 },
  { slug: 'e-scooter-maintenance-tips', category: 'Поради', date: '5 берез. 2026', title: 'Догляд за електросамокатом: 8 важливих порад', excerpt: 'Як продовжити термін служби акумулятора та зберегти самокат у відмінному стані.', bg: 'from-[#0a0a0a] to-[#252525]', readTime: 5 },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#0b0b0b] py-16">
        <div className="container-wide">
          <span className="section-label">Блог</span>
          <h1 className="section-heading text-white">
            Поради та <span className="text-[#ff5c00]">Огляди</span>
          </h1>
          <p className="text-white/50 text-sm mt-3">Все про електросамокати — від вибору до обслуговування</p>
        </div>
      </div>

      <div className="container-wide py-16">
        {/* Featured */}
        <Link
          href={`/blog/${POSTS[0].slug}`}
          className="group block mb-8 bg-[#f4f4f2] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className={`bg-gradient-to-br ${POSTS[0].bg} h-72 lg:h-auto flex items-center justify-center`}>
              <svg viewBox="0 0 80 60" fill="none" className="w-20 opacity-20">
                <circle cx="12" cy="48" r="10" stroke="white" strokeWidth="3"/>
                <circle cx="68" cy="48" r="10" stroke="white" strokeWidth="3"/>
                <path d="M12 48 L22 16 L52 10 L68 48" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#ff5c00] text-xs font-bold uppercase tracking-wider">{POSTS[0].category}</span>
                <span className="text-[#888884] text-xs">{POSTS[0].date}</span>
                <span className="text-[#888884] text-xs">{POSTS[0].readTime} хв читання</span>
              </div>
              <h2 className="text-2xl font-bold mb-4 group-hover:text-[#ff5c00] transition-colors leading-snug">
                {POSTS[0].title}
              </h2>
              <p className="text-[#888884] leading-relaxed mb-6">{POSTS[0].excerpt}</p>
              <span className="text-[#ff5c00] text-sm font-bold inline-flex items-center gap-1 group-hover:gap-3 transition-all">
                Читати статтю →
              </span>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POSTS.slice(1).map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-[#e8e8e5] rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className={`bg-gradient-to-br ${post.bg} h-48`} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#ff5c00] text-[10px] font-bold uppercase tracking-wider">{post.category}</span>
                  <span className="text-[#888884] text-xs">{post.date}</span>
                </div>
                <h3 className="font-bold leading-snug mb-2 group-hover:text-[#ff5c00] transition-colors">{post.title}</h3>
                <p className="text-[#888884] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <span className="text-[#ff5c00] text-xs font-bold">Читати далі →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
