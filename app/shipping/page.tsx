import Link from 'next/link';

export default function ShippingPage() {
  return (
    <section className="bg-neutral-950 min-h-screen py-8 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Головна</Link>
          <span>/</span>
          <span className="text-white">Доставка та оплата</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-10">Доставка та оплата</h1>

        {/* Delivery */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-lime-400/20 text-lime-400 rounded-xl flex items-center justify-center">📦</span>
            Доставка
          </h2>
          <div className="space-y-4">
            {[
              { name: 'Нова Пошта', time: '1-3 робочих дні', price: 'Безкоштовно', desc: 'Доставка у відділення або поштомат по всій Україні. Найпопулярніший спосіб.' },
              { name: 'Укрпошта', time: '3-7 робочих днів', price: 'Безкоштовно', desc: 'Доставка у поштове відділення Укрпошти.' },
              { name: 'Кур\'єр по Києву', time: '1 робочий день', price: 'Безкоштовно', desc: 'Доставка кур\'єром за вказаною адресою в межах Києва.' },
            ].map((d) => (
              <div key={d.name} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="text-white font-semibold text-lg">{d.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-400 text-sm">{d.time}</span>
                    <span className="bg-lime-400/20 text-lime-400 text-sm font-semibold px-3 py-0.5 rounded-full">{d.price}</span>
                  </div>
                </div>
                <p className="text-neutral-400 text-sm">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-lime-400/20 text-lime-400 rounded-xl flex items-center justify-center">💳</span>
            Оплата
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Visa / Mastercard', desc: 'Онлайн оплата банківською карткою', icon: '💳' },
              { name: 'Приват24', desc: 'Оплата через додаток Приват24', icon: '🏦' },
              { name: 'Monobank', desc: 'Оплата через додаток Monobank', icon: '📱' },
              { name: 'Накладений платіж', desc: 'Оплата при отриманні на пошті', icon: '💵' },
            ].map((p) => (
              <div key={p.name} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex items-start gap-4">
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <h3 className="text-white font-semibold">{p.name}</h3>
                  <p className="text-neutral-400 text-sm">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important info */}
        <div className="bg-neutral-900 border border-lime-400/30 rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-3">ℹ️ Важлива інформація</h3>
          <ul className="space-y-2 text-neutral-400 text-sm">
            <li>• Замовлення обробляються протягом 1 робочого дня</li>
            <li>• Відстежити замовлення можна за номером ТТН на сайті перевізника</li>
            <li>• При накладеному платежі комісія перевізника — за рахунок покупця</li>
            <li>• Для юридичних осіб — оплата за безготівковим розрахунком з ПДВ</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
