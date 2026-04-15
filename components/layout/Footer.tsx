import Link from 'next/link'

const SCOOTERS = [
  { label: 'Ausom L1', href: '/product/l1' },
  { label: 'Ausom L2 Dual Motor', href: '/product/l2-dual' },
  { label: 'Ausom L2 Max Dual Motor', href: '/product/l2-max-dual' },
  { label: 'Ausom DT2 Pro', href: '/product/dt2-pro' },
  { label: 'Порівняти моделі', href: '/compare' },
]

const COMPANY = [
  { label: 'Про нас', href: '/about' },
  { label: 'Блог', href: '/blog' },
  { label: 'Партнерська програма', href: '/affiliate' },
  { label: 'Програма лояльності', href: '/loyalty' },
  { label: 'Контакти', href: '/contact' },
]

const SUPPORT = [
  { label: 'Відстежити замовлення', href: '/track' },
  { label: 'Доставка та оплата', href: '/shipping' },
  { label: 'Повернення та обмін', href: '/returns' },
  { label: 'Гарантія', href: '/warranty' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Політика конфіденційності', href: '/privacy' },
]

const SOCIALS = [
  { label: 'TW', href: 'https://twitter.com' },
  { label: 'FB', href: 'https://facebook.com' },
  { label: 'IG', href: 'https://instagram.com' },
  { label: 'TK', href: 'https://tiktok.com' },
  { label: 'YT', href: 'https://youtube.com' },
]

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5">
      <div className="container-wide pt-16 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/5">

          {/* Brand */}
          <div>
            <Link href="/" className="font-display text-3xl tracking-widest text-white block mb-4">
              AUSOM <span className="text-[#ff5c00]">UA</span>
            </Link>
            <p className="text-[#555] text-sm leading-relaxed mb-6 max-w-[260px]">
              Офіційний дистриб'ютор Ausom в Україні. Найкращі електросамокати для міста та бездоріжжя.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/10 rounded-lg flex items-center justify-center text-[#555] text-xs font-bold hover:border-[#ff5c00] hover:text-[#ff5c00] transition-all"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Scooters */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[.14em] uppercase text-[#333] mb-5">Самокати</h4>
            <div className="flex flex-col gap-0.5">
              {SCOOTERS.map(l => (
                <Link key={l.href} href={l.href} className="text-[#555] text-sm py-1 hover:text-[#ff5c00] transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[.14em] uppercase text-[#333] mb-5">Компанія</h4>
            <div className="flex flex-col gap-0.5">
              {COMPANY.map(l => (
                <Link key={l.href} href={l.href} className="text-[#555] text-sm py-1 hover:text-[#ff5c00] transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[.14em] uppercase text-[#333] mb-5">Підтримка</h4>
            <div className="flex flex-col gap-0.5">
              {SUPPORT.map(l => (
                <Link key={l.href} href={l.href} className="text-[#555] text-sm py-1 hover:text-[#ff5c00] transition-colors">
                  {l.label}
                </Link>
              ))}
              <a href="mailto:support@ausom.ua" className="text-[#555] text-sm py-1 hover:text-[#ff5c00] transition-colors">
                support@ausom.ua
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-[#333] text-xs">© 2026 Ausom Ukraine. Всі права захищені.</p>
          <div className="flex gap-2 flex-wrap">
            {['VISA', 'Mastercard', 'PayPal', 'Privat24', 'Monobank'].map(p => (
              <span key={p} className="border border-white/8 rounded text-[#444] text-[11px] font-bold px-3 py-1.5 tracking-wide">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
