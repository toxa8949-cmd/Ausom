import Link from 'next/link';

export default function ReturnsPage() {
  return (
    <section className="bg-neutral-950 min-h-screen py-8 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Головна</Link>
          <span>/</span>
          <span className="text-white">Повернення та обмін</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Повернення та обмін</h1>
        <p className="text-neutral-400 text-lg mb-10">
          14 днів на повернення без питань. Ми впевнені в якості наших самокатів.
        </p>

        <div className="space-y-6">
          {/* 14 days return */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
              <span className="w-10 h-10 bg-lime-400/20 text-lime-400 rounded-xl flex items-center justify-center text-lg">↩️</span>
              14 днів на повернення
            </h2>
            <p className="text-neutral-400 leading-relaxed mb-4">
              Ви маєте право повернути товар належної якості протягом 14 днів з моменту отримання, 
              якщо він не був у використанні, збережено товарний вигляд та упаковку.
            </p>
            <div className="bg-neutral-800 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-2">Умови повернення:</h3>
              <ul className="space-y-1.5 text-neutral-400 text-sm">
                <li>• Товар не був у використанні (без слідів експлуатації)</li>
                <li>• Збережено оригінальну упаковку та всі комплектуючі</li>
                <li>• Наявність чеку або документа, що підтверджує покупку</li>
                <li>• Повернення протягом 14 календарних днів з моменту отримання</li>
              </ul>
            </div>
          </div>

          {/* Exchange */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
              <span className="w-10 h-10 bg-lime-400/20 text-lime-400 rounded-xl flex items-center justify-center text-lg">🔄</span>
              Обмін товару
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              Якщо вам не підійшла модель — ми допоможемо обміняти на іншу. Різницю в ціні 
              можна доплатити або отримати повернення. Обмін здійснюється протягом 14 днів.
            </p>
          </div>

          {/* Defect return */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
              <span className="w-10 h-10 bg-lime-400/20 text-lime-400 rounded-xl flex items-center justify-center text-lg">🛠️</span>
              Повернення неякісного товару
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              Якщо ви виявили заводський дефект — зв&apos;яжіться з нами. Ми організуємо безкоштовне 
              повернення та заміну товару або повне відшкодування коштів.
            </p>
          </div>

          {/* How to return */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Як оформити повернення?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { step: '1', title: 'Зв\'яжіться з нами', desc: 'Напишіть на support@ausom.ua або зателефонуйте' },
                { step: '2', title: 'Отримайте інструкції', desc: 'Ми надішлемо ТТН для безкоштовного повернення' },
                { step: '3', title: 'Отримайте кошти', desc: 'Повернення коштів протягом 3-5 робочих днів' },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-10 h-10 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                    {s.step}
                  </div>
                  <h3 className="text-white font-semibold mb-1">{s.title}</h3>
                  <p className="text-neutral-400 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-8 text-center">
          <Link href="/contact" className="inline-block bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 px-8 rounded-xl transition-all">
            Зв&apos;язатися з підтримкою
          </Link>
        </div>
      </div>
    </section>
  );
}
