import Link from 'next/link';

export default function AffiliatePage() {
  return (
    <section className="bg-neutral-950 min-h-screen py-8 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Головна</Link>
          <span>/</span>
          <span className="text-white">Партнерство</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-br from-lime-400/10 via-neutral-900 to-neutral-900 border border-lime-400/20 rounded-3xl p-8 md:p-12 text-center mb-12">
          <span className="inline-block bg-lime-400/20 text-lime-400 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            Партнерська програма
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Заробляй з Ausom Ukraine
          </h1>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Рекомендуй самокати Ausom та отримуй комісію з кожного продажу. 
            Приєднуйся до нашої партнерської програми.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: '💰', title: 'До 10% комісії', desc: 'Отримуй до 10% від кожного продажу, здійсненого за твоїм посиланням.' },
            { icon: '🔗', title: 'Персональне посилання', desc: 'Унікальне реферальне посилання для відстеження всіх продажів.' },
            { icon: '📊', title: 'Прозора аналітика', desc: 'Дашборд з повною статистикою кліків, продажів та виплат.' },
          ].map((b) => (
            <div key={b.title} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center">
              <span className="text-3xl mb-3 block">{b.icon}</span>
              <h3 className="text-white font-bold text-lg mb-2">{b.title}</h3>
              <p className="text-neutral-400 text-sm">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Як це працює</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Реєстрація', desc: 'Заповни форму та отримай доступ' },
              { step: '2', title: 'Посилання', desc: 'Отримай персональне реферальне посилання' },
              { step: '3', title: 'Рекомендуй', desc: 'Ділись посиланням з аудиторією' },
              { step: '4', title: 'Заробляй', desc: 'Отримуй комісію за кожен продаж' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                  {s.step}
                </div>
                <h3 className="text-white font-semibold mb-1">{s.title}</h3>
                <p className="text-neutral-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who is this for */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Для кого ця програма?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              '🎥 Блогери та контент-мейкери',
              '📱 Власники соцмереж з аудиторією',
              '🏪 Веломагазини та сервісні центри',
              '🏢 Компанії з корпоративними потребами',
              '👥 Спільноти електротранспорту',
              '📰 Технологічні медіа та огляди',
            ].map((who) => (
              <div key={who} className="flex items-center gap-3 text-neutral-300">
                <span className="text-lime-400">✓</span>
                <span>{who}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-block bg-lime-400 hover:bg-lime-300 text-black font-bold py-4 px-10 rounded-xl transition-all text-lg"
          >
            Стати партнером
          </Link>
          <p className="text-neutral-500 text-sm mt-3">
            Напишіть нам на <a href="mailto:partners@ausom.ua" className="text-lime-400 hover:underline">partners@ausom.ua</a>
          </p>
        </div>
      </div>
    </section>
  );
}
