import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <section className="bg-neutral-950 min-h-screen py-8 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Головна</Link>
          <span>/</span>
          <span className="text-white">Конфіденційність</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Політика конфіденційності</h1>
        <p className="text-neutral-500 text-sm mb-10">Останнє оновлення: 1 січня 2026</p>

        <div className="prose-invert space-y-8">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-3">1. Загальні положення</h2>
              <p className="text-neutral-400 leading-relaxed">
                Ausom Ukraine (далі — &quot;ми&quot;, &quot;нас&quot;) поважає вашу конфіденційність і зобов&apos;язується захищати 
                ваші персональні дані. Ця політика конфіденційності пояснює, які дані ми збираємо, як їх 
                використовуємо та захищаємо при використанні нашого веб-сайту ausom.vercel.app.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">2. Які дані ми збираємо</h2>
              <p className="text-neutral-400 leading-relaxed mb-3">Ми можемо збирати наступні категорії даних:</p>
              <ul className="space-y-1.5 text-neutral-400 text-sm">
                <li>• <strong className="text-neutral-300">Контактні дані:</strong> ім&apos;я, прізвище, email, номер телефону</li>
                <li>• <strong className="text-neutral-300">Дані доставки:</strong> місто, адреса, номер відділення пошти</li>
                <li>• <strong className="text-neutral-300">Дані замовлень:</strong> історія покупок, обрані товари</li>
                <li>• <strong className="text-neutral-300">Технічні дані:</strong> IP-адреса, тип браузера, дані cookies</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">3. Як ми використовуємо дані</h2>
              <ul className="space-y-1.5 text-neutral-400 text-sm">
                <li>• Обробка та виконання замовлень</li>
                <li>• Зв&apos;язок з клієнтами щодо замовлень та підтримки</li>
                <li>• Надсилання інформації про акції та нові продукти (за згодою)</li>
                <li>• Покращення роботи веб-сайту та сервісу</li>
                <li>• Виконання юридичних зобов&apos;язань</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">4. Захист даних</h2>
              <p className="text-neutral-400 leading-relaxed">
                Ми використовуємо сучасні технології захисту даних, включаючи SSL-шифрування, 
                безпечне зберігання та обмежений доступ до персональної інформації. Ми не передаємо 
                ваші дані третім особам, окрім випадків, необхідних для виконання замовлень (служби доставки) 
                або відповідно до вимог законодавства.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">5. Cookies</h2>
              <p className="text-neutral-400 leading-relaxed">
                Наш сайт використовує cookies для забезпечення коректної роботи, аналітики та 
                персоналізації. Ви можете налаштувати використання cookies у своєму браузері.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">6. Ваші права</h2>
              <p className="text-neutral-400 leading-relaxed mb-3">Відповідно до законодавства України, ви маєте право:</p>
              <ul className="space-y-1.5 text-neutral-400 text-sm">
                <li>• Отримати інформацію про ваші персональні дані</li>
                <li>• Вимагати виправлення неточних даних</li>
                <li>• Вимагати видалення ваших даних</li>
                <li>• Відкликати згоду на обробку даних</li>
                <li>• Подати скаргу до Уповноваженого ВР з прав людини</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">7. Контакти</h2>
              <p className="text-neutral-400 leading-relaxed">
                З питань конфіденційності зв&apos;яжіться з нами: <br />
                Email: <a href="mailto:support@ausom.ua" className="text-lime-400 hover:underline">support@ausom.ua</a><br />
                Телефон: <a href="tel:+380670000000" className="text-lime-400 hover:underline">+38 (067) 000-00-00</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
