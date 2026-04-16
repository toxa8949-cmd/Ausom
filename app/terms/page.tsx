import Link from 'next/link';

export default function TermsPage() {
  return (
    <section className="bg-neutral-950 min-h-screen py-8 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Головна</Link>
          <span>/</span>
          <span className="text-white">Умови використання</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Умови використання</h1>
        <p className="text-neutral-500 text-sm mb-10">Останнє оновлення: 1 січня 2026</p>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-3">1. Загальні умови</h2>
            <p className="text-neutral-400 leading-relaxed">
              Використовуючи веб-сайт ausom.vercel.app (далі — &quot;Сайт&quot;), ви погоджуєтесь з цими 
              умовами використання. Сайт належить та управляється Ausom Ukraine — офіційним 
              дистриб&apos;ютором бренду Ausom в Україні. Якщо ви не згодні з будь-яким пунктом, 
              будь ласка, припиніть використання Сайту.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">2. Замовлення та покупки</h2>
            <p className="text-neutral-400 leading-relaxed">
              Оформлюючи замовлення, ви підтверджуєте, що вам виповнилось 18 років та ви надаєте 
              достовірну інформацію. Ми залишаємо за собою право відмовити у виконанні замовлення 
              у випадку надання недостовірних даних. Ціни на сайті вказані в українських гривнях (₴) 
              та включають ПДВ.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">3. Ціни та знижки</h2>
            <p className="text-neutral-400 leading-relaxed">
              Ми докладаємо зусиль для забезпечення точності цін на Сайті. У разі виявлення помилки 
              в ціні, ми зв&apos;яжемось з вами перед виконанням замовлення. Акційні пропозиції та знижки 
              мають обмежений термін дії та можуть бути змінені без попередження.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">4. Доставка</h2>
            <p className="text-neutral-400 leading-relaxed">
              Терміни доставки є орієнтовними та залежать від обраного способу доставки та вашого 
              місцезнаходження. Ми не несемо відповідальності за затримки, спричинені діями 
              поштових служб або форс-мажорними обставинами.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">5. Повернення та обмін</h2>
            <p className="text-neutral-400 leading-relaxed">
              Повернення та обмін товарів здійснюється відповідно до Закону України &quot;Про захист 
              прав споживачів&quot;. Детальні умови повернення описані на сторінці{' '}
              <Link href="/returns" className="text-lime-400 hover:underline">Повернення та обмін</Link>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">6. Інтелектуальна власність</h2>
            <p className="text-neutral-400 leading-relaxed">
              Весь контент на Сайті (тексти, зображення, логотипи, дизайн) є власністю Ausom Ukraine 
              або використовується з дозволу правовласників. Копіювання, розповсюдження або інше 
              використання матеріалів Сайту без письмового дозволу заборонено.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">7. Обмеження відповідальності</h2>
            <p className="text-neutral-400 leading-relaxed">
              Ausom Ukraine не несе відповідальності за шкоду, завдану внаслідок неправильної 
              експлуатації продукції, недотримання інструкцій з використання або модифікації товарів.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">8. Зміни умов</h2>
            <p className="text-neutral-400 leading-relaxed">
              Ми залишаємо за собою право змінювати ці умови в будь-який час. Актуальна версія 
              завжди доступна на цій сторінці. Продовжуючи використання Сайту після внесення змін, 
              ви погоджуєтесь з оновленими умовами.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">9. Контакти</h2>
            <p className="text-neutral-400 leading-relaxed">
              З питань щодо цих умов зв&apos;яжіться з нами:<br />
              Email: <a href="mailto:support@ausom.ua" className="text-lime-400 hover:underline">support@ausom.ua</a><br />
              Телефон: <a href="tel:+380670000000" className="text-lime-400 hover:underline">+38 (067) 000-00-00</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
