import Link from 'next/link';

export default function WarrantyPage() {
  return (
    <section className="bg-neutral-950 min-h-screen py-8 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Головна</Link>
          <span>/</span>
          <span className="text-white">Гарантія</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Гарантія</h1>
        <p className="text-neutral-400 text-lg mb-10">
          Офіційна гарантія 2 роки на всі моделі Ausom. Ми стоїмо за якістю нашої продукції.
        </p>

        {/* Main warranty card */}
        <div className="bg-gradient-to-br from-lime-400/10 via-neutral-900 to-neutral-900 border border-lime-400/30 rounded-2xl p-8 mb-8 text-center">
          <div className="w-16 h-16 bg-lime-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🛡️</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">2 роки гарантії</h2>
          <p className="text-neutral-400 max-w-lg mx-auto">
            На всі електросамокати Ausom, придбані через офіційний магазин Ausom Ukraine
          </p>
        </div>

        <div className="space-y-6">
          {/* What's covered */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">✅ Що покриває гарантія</h2>
            <ul className="space-y-2 text-neutral-300">
              <li className="flex items-start gap-3">
                <span className="text-lime-400 mt-0.5">•</span>
                <span>Заводські дефекти мотора, контролера та електроніки</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lime-400 mt-0.5">•</span>
                <span>Несправність акумулятора (деградація більше 20% за перший рік)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lime-400 mt-0.5">•</span>
                <span>Дефекти рами та складального механізму</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lime-400 mt-0.5">•</span>
                <span>Несправність гальмівної системи</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lime-400 mt-0.5">•</span>
                <span>Дефекти підвіски та амортизаторів</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lime-400 mt-0.5">•</span>
                <span>Несправність дисплея та освітлення</span>
              </li>
            </ul>
          </div>

          {/* What's not covered */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">❌ Що не покриває гарантія</h2>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Механічні пошкодження внаслідок аварій або падінь</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Природний знос (шини, гальмівні колодки, грипси)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Пошкодження від неправильного зберігання або експлуатації</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Самостійний ремонт або модифікація</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Пошкодження від води (понад норми захисту IP)</span>
              </li>
            </ul>
          </div>

          {/* How to claim */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">📋 Як скористатися гарантією</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { step: '1', text: 'Зв\'яжіться з підтримкою та опишіть проблему' },
                { step: '2', text: 'Надішліть фото/відео дефекту для діагностики' },
                { step: '3', text: 'Отримайте безкоштовну ТТН для відправки' },
                { step: '4', text: 'Ремонт або заміна протягом 5-10 робочих днів' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-lime-400/20 text-lime-400 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                    {s.step}
                  </span>
                  <p className="text-neutral-300 text-sm">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/contact" className="inline-block bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 px-8 rounded-xl transition-all">
            Зв&apos;язатися з підтримкою
          </Link>
        </div>
      </div>
    </section>
  );
}
