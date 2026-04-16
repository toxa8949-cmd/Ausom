import Link from 'next/link';

export default function LoyaltyPage() {
  return (
    <section className="bg-neutral-950 min-h-screen py-8 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Головна</Link>
          <span>/</span>
          <span className="text-white">Програма лояльності</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-br from-yellow-500/10 via-neutral-900 to-orange-500/5 border border-yellow-500/20 rounded-3xl p-8 md:p-12 text-center mb-12">
          <span className="inline-block bg-yellow-500/20 text-yellow-400 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            ⭐ Ausom Club
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Програма лояльності
          </h1>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Купуй, накопичуй бонуси та отримуй ексклюзивні привілеї як член Ausom Club.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              name: 'Bronze',
              color: 'from-orange-700/30 to-orange-900/10',
              border: 'border-orange-700/30',
              icon: '🥉',
              requirement: 'Перша покупка',
              benefits: ['3% кешбек бонусами', 'Знижка 5% на аксесуари', 'Пріоритетна підтримка'],
            },
            {
              name: 'Silver',
              color: 'from-neutral-400/20 to-neutral-600/10',
              border: 'border-neutral-400/30',
              icon: '🥈',
              requirement: 'Від 50 000 ₴',
              benefits: ['5% кешбек бонусами', 'Знижка 10% на аксесуари', 'Безкоштовне ТО 1 раз/рік', 'Ранній доступ до новинок'],
            },
            {
              name: 'Gold',
              color: 'from-yellow-500/20 to-yellow-700/10',
              border: 'border-yellow-500/30',
              icon: '🥇',
              requirement: 'Від 100 000 ₴',
              benefits: ['8% кешбек бонусами', 'Знижка 15% на аксесуари', 'Безкоштовне ТО 2 рази/рік', 'VIP підтримка 24/7', 'Ексклюзивні акції'],
            },
          ].map((tier) => (
            <div key={tier.name} className={`bg-gradient-to-br ${tier.color} border ${tier.border} rounded-2xl p-6`}>
              <span className="text-3xl block mb-2">{tier.icon}</span>
              <h3 className="text-white font-bold text-xl mb-1">{tier.name}</h3>
              <p className="text-neutral-400 text-sm mb-4">{tier.requirement}</p>
              <ul className="space-y-2">
                {tier.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-neutral-300 text-sm">
                    <span className="text-lime-400 mt-0.5">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* How bonuses work */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Як працюють бонуси?</h2>
          <div className="space-y-4 text-neutral-400">
            <p>
              За кожну покупку ви отримуєте бонуси відповідно до вашого рівня. 
              1 бонус = 1 гривня. Бонуси можна використати для оплати до 30% вартості 
              наступної покупки.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-neutral-800 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-1">Нарахування</h4>
                <p className="text-sm">Бонуси нараховуються автоматично після підтвердження отримання замовлення.</p>
              </div>
              <div className="bg-neutral-800 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-1">Термін дії</h4>
                <p className="text-sm">Бонуси дійсні протягом 12 місяців з моменту нарахування.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-neutral-400 mb-4">Стаєте учасником автоматично з першою покупкою!</p>
          <Link
            href="/catalog"
            className="inline-block bg-lime-400 hover:bg-lime-300 text-black font-bold py-4 px-10 rounded-xl transition-all text-lg"
          >
            Перейти до каталогу
          </Link>
        </div>
      </div>
    </section>
  );
}
