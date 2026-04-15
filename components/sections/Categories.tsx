import Link from 'next/link'

const CATS = [
  {
    title: 'Позашляхові',
    sub: 'Для бездоріжжя та пригод',
    href: '/catalog?category=offroad',
    bg: 'from-[#1a0500] via-[#3d1000] to-[#7a2500]',
  },
  {
    title: 'Міські',
    sub: 'Для щоденних поїздок',
    href: '/catalog?category=commuter',
    bg: 'from-[#050d18] via-[#0d2035] to-[#1a3d66]',
  },
  {
    title: 'Топ Акції',
    sub: 'Знижки до −€400',
    href: '/catalog?filter=sale',
    bg: 'from-[#0b0b0b] via-[#181818] to-[#282828]',
  },
]

export default function Categories() {
  return (
    <section className="py-24 bg-white">
      <div className="container-wide">
        <div className="mb-12">
          <span className="section-label">Категорії</span>
          <h2 className="section-heading">
            Де ти <span className="text-[#ff5c00]">Їдеш?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CATS.map(cat => (
            <Link
              key={cat.title}
              href={cat.href}
              className={`group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${cat.bg} flex items-end`}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Hover zoom bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.bg} transition-transform duration-500 group-hover:scale-105`} />

              {/* Content */}
              <div className="relative z-10 p-8">
                <h3 className="font-display text-3xl text-white uppercase tracking-wide mb-1">
                  {cat.title}
                </h3>
                <p className="text-white/60 text-sm mb-5">{cat.sub}</p>
                <span className="inline-flex items-center gap-2 bg-[#ff5c00] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-md transition-colors group-hover:bg-[#ff7a2b]">
                  Дивитись →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
