'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TrackPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      setSearched(true);
    }
  };

  return (
    <section className="bg-neutral-950 min-h-screen py-8 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Головна</Link>
          <span>/</span>
          <span className="text-white">Відстежити замовлення</span>
        </nav>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Відстежити замовлення</h1>
          <p className="text-neutral-400 text-lg">
            Введіть номер замовлення або ТТН для відстеження статусу доставки
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => { setOrderNumber(e.target.value); setSearched(false); }}
              placeholder="Номер замовлення (напр. AU-12345) або ТТН"
              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-lime-400 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 px-8 rounded-xl transition-all whitespace-nowrap"
            >
              Знайти
            </button>
          </form>
        </div>

        {searched && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 text-center">
            <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📦</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Замовлення не знайдено</h2>
            <p className="text-neutral-400 mb-6">
              Не вдалося знайти замовлення &quot;{orderNumber}&quot;. Перевірте правильність номера або зв&apos;яжіться з підтримкою.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 px-6 rounded-xl transition-all">
                Написати підтримці
              </Link>
              <a href="tel:+380670000000" className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 px-6 rounded-xl transition-all border border-neutral-700">
                📞 Зателефонувати
              </a>
            </div>
          </div>
        )}

        {/* Tracking info */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-bold text-white">Також можна відстежити через:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://novaposhta.ua/tracking"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-all flex items-center gap-4"
            >
              <span className="text-2xl">📦</span>
              <div>
                <p className="text-white font-semibold">Нова Пошта</p>
                <p className="text-neutral-400 text-sm">novaposhta.ua/tracking</p>
              </div>
              <span className="ml-auto text-neutral-500">→</span>
            </a>
            <a
              href="https://track.ukrposhta.ua/tracking_UA.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-all flex items-center gap-4"
            >
              <span className="text-2xl">✉️</span>
              <div>
                <p className="text-white font-semibold">Укрпошта</p>
                <p className="text-neutral-400 text-sm">track.ukrposhta.ua</p>
              </div>
              <span className="ml-auto text-neutral-500">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
