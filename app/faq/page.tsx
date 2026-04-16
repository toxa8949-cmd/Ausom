'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqCategories = [
  {
    title: 'Замовлення та доставка',
    questions: [
      {
        q: 'Як швидко доставляють замовлення?',
        a: 'Нова Пошта — 1-3 робочих дні, Укрпошта — 3-7 робочих днів, кур\'єр по Києву — 1 робочий день. Замовлення обробляються протягом 1 робочого дня.',
      },
      {
        q: 'Доставка безкоштовна?',
        a: 'Так, доставка безкоштовна по всій Україні на всі моделі електросамокатів. Для запчастин та аксесуарів — безкоштовна від суми 1000 грн.',
      },
      {
        q: 'Чи можу я отримати самокат сьогодні?',
        a: 'Якщо ви в Києві — так! Оберіть кур\'єрську доставку, і ми доставимо замовлення в той же день (при замовленні до 14:00).',
      },
      {
        q: 'Які способи оплати доступні?',
        a: 'Visa/Mastercard, Приват24, Monobank, накладений платіж (оплата при отриманні). Для юридичних осіб — безготівковий розрахунок з ПДВ.',
      },
    ],
  },
  {
    title: 'Повернення та гарантія',
    questions: [
      {
        q: 'Яка гарантія на самокати?',
        a: 'Офіційна гарантія 2 роки на всі моделі Ausom, придбані через наш магазин. Гарантія покриває заводські дефекти мотора, батареї, електроніки та рами.',
      },
      {
        q: 'Чи можу я повернути самокат?',
        a: 'Так, протягом 14 днів з моменту отримання. Товар повинен бути в оригінальній упаковці, без слідів використання. Повернення безкоштовне.',
      },
      {
        q: 'Що робити, якщо самокат зламався?',
        a: 'Зв\'яжіться з нашою підтримкою (support@ausom.ua або +38 067 000-00-00). Ми проведемо діагностику та організуємо безкоштовний ремонт або заміну по гарантії.',
      },
    ],
  },
  {
    title: 'Про самокати',
    questions: [
      {
        q: 'Який самокат обрати для міста?',
        a: 'Для щоденних міських поїздок рекомендуємо Ausom L1 (легкий, компактний, 50 км запасу ходу) або L2 Dual Motor (потужніший, 70 км). Для бездоріжжя — DT2 Pro.',
      },
      {
        q: 'Яка максимальна швидкість?',
        a: 'Залежить від моделі: L1 — 45 км/год, L2 Dual — 55 км/год, L2 Max Dual — 55 км/год, DT2 Pro — 65 км/год. Швидкість можна обмежити в налаштуваннях.',
      },
      {
        q: 'Скільки заряджається акумулятор?',
        a: 'Від 6 до 10 годин залежно від моделі. L1 — 6-7 годин, L2 Dual — 7-8, L2 Max — 8-9, DT2 Pro — 9-10 годин. Рекомендуємо заряджати вночі.',
      },
      {
        q: 'Чи можна їздити в дощ?',
        a: 'Так, всі моделі мають захист IP54-IP55. Це означає захист від бризок та пилу. Проте не рекомендуємо їздити по глибоких калюжах.',
      },
      {
        q: 'Яка максимальна вага водія?',
        a: 'L1 — до 120 кг, L2 Dual, L2 Max Dual та DT2 Pro — до 150 кг.',
      },
    ],
  },
];

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-neutral-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-800/50 transition-colors"
      >
        <span className="text-white font-semibold pr-4">{question}</span>
        <span className={`text-lime-400 text-xl flex-shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-0">
          <p className="text-neutral-400 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <section className="bg-neutral-950 min-h-screen py-8 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Головна</Link>
          <span>/</span>
          <span className="text-white">FAQ</span>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Часті питання</h1>
          <p className="text-neutral-400 text-lg">Відповіді на найпопулярніші запитання наших клієнтів</p>
        </div>

        <div className="space-y-10">
          {faqCategories.map((cat) => (
            <div key={cat.title}>
              <h2 className="text-xl font-bold text-white mb-4">{cat.title}</h2>
              <div className="space-y-3">
                {cat.questions.map((faq) => (
                  <AccordionItem key={faq.q} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Не знайшли відповідь?</h3>
          <p className="text-neutral-400 mb-6">Напишіть нам — ми відповімо якнайшвидше.</p>
          <Link href="/contact" className="inline-block bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 px-8 rounded-xl transition-all">
            Зв&apos;язатися з нами
          </Link>
        </div>
      </div>
    </section>
  );
}
