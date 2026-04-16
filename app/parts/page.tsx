'use client';

import Link from 'next/link';

const partsCategories = [
  {
    icon: '🔋', name: 'Акумулятори', description: 'Оригінальні батареї для всіх моделей Ausom',
    items: ['Батарея Ausom L1 (468 Wh)', 'Батарея L2 Dual (768 Wh)', 'Батарея L2 Max (960 Wh)', 'Батарея DT2 Pro (1066 Wh)'],
  },
  {
    icon: '🛞', name: 'Колеса та шини', description: 'Покришки, камери та диски',
    items: ['Покришка 10" (L1, L2)', 'Покришка 11" (L2 Max, DT2 Pro)', 'Камера 10"', 'Камера 11"'],
  },
  {
    icon: '🔧', name: 'Гальма', description: 'Гальмівні колодки, диски та тросики',
    items: ['Гальмівні колодки (комплект)', 'Гальмівний диск 140мм', 'Гальмівний тросик', 'Гідравлічний шланг'],
  },
  {
    icon: '💡', name: 'Освітлення', description: 'Фари, задні ліхтарі та поворотники',
    items: ['Передня LED фара', 'Задній ліхтар', 'Поворотники (пара)', 'Декоративна LED стрічка'],
  },
  {
    icon: '🎛️', name: 'Електроніка', description: 'Контролери, дисплеї та зарядки',
    items: ['Контролер (по моделі)', 'LCD дисплей', 'Зарядний пристрій', 'Ручка газу'],
  },
  {
    icon: '🛡️', name: 'Аксесуари', description: 'Захист, сумки та додаткове обладнання',
    items: ['Сумка на кермо', 'Замок протиугінний', 'Дзеркало заднього виду (пара)', 'Бризговики (комплект)'],
  },
];

export default function PartsPage() {
  return (
    <section className="bg-neutral-950 min-h-screen py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Головна</Link>
          <span>/</span>
          <span className="text-white">Запчастини</span>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Запчастини та аксесуари</h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Оригінальні запчастини Ausom. Для замовлення зв&apos;яжіться з нами — підберемо потрібну деталь.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {partsCategories.map((cat) => (
            <div key={cat.name} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-all">
              <span className="text-3xl mb-3 block">{cat.icon}</span>
              <h3 className="text-white font-bold text-xl mb-2">{cat.name}</h3>
              <p className="text-neutral-400 text-sm mb-4">{cat.description}</p>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="text-neutral-300 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-lime-400 rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Потрібна запчастина?</h2>
          <p className="text-neutral-400 mb-6 max-w-xl mx-auto">
            Зв&apos;яжіться з нами — допоможемо підібрати та замовити потрібну деталь для вашого самоката.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 px-8 rounded-xl transition-all">
              Написати нам
            </Link>
            <a href="tel:+380670000000" className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 px-8 rounded-xl transition-all border border-neutral-700">
              📞 +38 (067) 000-00-00
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
