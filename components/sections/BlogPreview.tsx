import Link from 'next/link'

const POSTS = [
  {
    slug: 'best-scooters-heavy-adults-2026',
    category: 'Огляди',
    date: '30 берез. 2026',
    title: 'Найкращі електросамокати для важких дорослих у 2026 — Топ вибір',
    excerpt: 'Шукаєш самокат з великим навантаженням? Гід по топ-моделях з подвійним мотором та посиленою рамою.',
    bg: 'from-[#1a0500] to-[#7a2500]',
    large: true,
  },
  {
    slug: '10-features-buying-scooter',
    category: 'Гід покупця',
    date: '30 берез. 2026',
    title: '10 ключових характеристик при виборі електросамоката',
    excerpt: 'Від потужності мотора до системи безпеки — все що потрібно знати перед покупкою.',
    bg: 'from-[#050d18] to-[#1a3048]',
    large: false,
  },
  {
    slug: 'best-adult-scooter-2026-guide',
    category: 'Порівняння',
    date: '30 берез. 2026',
    title: 'Найкращий електросамокат для дорослих 2026: повний гід',
    excerpt: 'Порівнюємо потужність, запас ходу та портативність. Дізнайся чому Ausom — вибір №1.',
    bg: 'from-[#080808] to-[#1f1f1f]',
    large: false,
  },
]

export default function BlogPreview() {
  return (
    <section className="py-24 bg-[#f4f4f2]" id="blog">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="section-label">Блог</span>
            <h2 className="section-heading">
              Поради та <span className="text-[#ff5c00]">Огляди</span>
            </h2>
          </div>
          <Link href="/blog" className="text-sm font-bold text-[#0b0b0b] border-b-2 border-[#ff5c00] pb-0.5 hover:text-[#ff5c00] transition-colors">
            Всі статті →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {POSTS.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-[#e8e8e5] rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className={`bg-gradient-to-br ${post.bg} ${post.large ? 'h-64' : 'h-48'} flex items-center justify-center`}>
                <svg viewBox="0 0 80 60" fill="none" className="w-16 opacity-20">
                  <path d="M10 50 L20 20 L40 16 L50 50" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="10" cy="50" r="8" stroke="white" strokeWidth="3"/>
                  <circle cx="50" cy="50" r="8" stroke="white" strokeWidth="3"/>
                  <path d="M20 20 L28 8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#ff5c00] text-[10px] font-bold uppercase tracking-wider">{post.category}</span>
                  <span className="text-[#888884] text-xs">{post.date}</span>
                </div>
                <h3 className={`font-bold leading-snug mb-2 group-hover:text-[#ff5c00] transition-colors ${post.large ? 'text-lg' : 'text-base'}`}>
                  {post.title}
                </h3>
                <p className="text-[#888884] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <span className="text-[#ff5c00] text-xs font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Читати далі →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
