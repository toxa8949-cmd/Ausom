'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    delivery: 'nova-poshta',
    payment: 'card',
    comment: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('ausom-cart') || '[]');
      setCart(stored);
    } catch { setCart([]); }
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    localStorage.removeItem('ausom-cart');
    window.dispatchEvent(new Event('cart-updated'));
  };

  if (submitted) {
    return (
      <section className="bg-neutral-950 min-h-screen py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10">
            <div className="w-20 h-20 bg-lime-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-lime-400 text-4xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Замовлення оформлено!</h1>
            <p className="text-neutral-400 mb-2">Дякуємо за покупку! Ми зв&apos;яжемось з вами найближчим часом.</p>
            <p className="text-neutral-500 text-sm mb-8">Номер замовлення: #AU-{Math.floor(Math.random() * 90000 + 10000)}</p>
            <Link
              href="/"
              className="inline-block bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 px-8 rounded-xl transition-all"
            >
              На головну
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="bg-neutral-950 min-h-screen py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Кошик порожній</h1>
          <p className="text-neutral-400 mb-8">Додайте товари до кошика, щоб оформити замовлення.</p>
          <Link
            href="/catalog"
            className="inline-block bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 px-8 rounded-xl transition-all"
          >
            До каталогу
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-neutral-950 min-h-screen py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Головна</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-white transition-colors">Кошик</Link>
          <span>/</span>
          <span className="text-white">Оформлення</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Оформлення замовлення</h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-10">
          {[
            { n: 1, label: 'Контакти' },
            { n: 2, label: 'Доставка' },
            { n: 3, label: 'Оплата' },
          ].map((s) => (
            <div key={s.n} className="flex items-center gap-2">
              <button
                onClick={() => s.n < step && setStep(s.n)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s.n
                    ? 'bg-lime-400 text-black'
                    : 'bg-neutral-800 text-neutral-500'
                }`}
              >
                {s.n}
              </button>
              <span className={`text-sm hidden sm:inline ${step >= s.n ? 'text-white' : 'text-neutral-500'}`}>
                {s.label}
              </span>
              {s.n < 3 && <div className="w-8 sm:w-16 h-px bg-neutral-700 mx-1" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Контактні дані</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-neutral-400 mb-1">Ім&apos;я *</label>
                    <input
                      type="text" name="firstName" value={form.firstName} onChange={handleChange}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-lime-400 focus:outline-none transition-colors"
                      placeholder="Олександр"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-400 mb-1">Прізвище *</label>
                    <input
                      type="text" name="lastName" value={form.lastName} onChange={handleChange}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-lime-400 focus:outline-none transition-colors"
                      placeholder="Петренко"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Телефон *</label>
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-lime-400 focus:outline-none transition-colors"
                    placeholder="+38 (067) 000-00-00"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Email *</label>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-lime-400 focus:outline-none transition-colors"
                    placeholder="email@example.com"
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 rounded-xl transition-all"
                >
                  Далі →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Доставка</h2>
                <div className="space-y-3">
                  {[
                    { id: 'nova-poshta', label: 'Нова Пошта', desc: 'Безкоштовна доставка, 1-3 дні', icon: '📦' },
                    { id: 'ukrposhta', label: 'Укрпошта', desc: 'Безкоштовна доставка, 3-7 днів', icon: '✉️' },
                    { id: 'courier', label: 'Кур\'єр (Київ)', desc: 'Безкоштовно, 1 день', icon: '🚚' },
                  ].map((d) => (
                    <label
                      key={d.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        form.delivery === d.id
                          ? 'border-lime-400 bg-lime-400/5'
                          : 'border-neutral-700 hover:border-neutral-600'
                      }`}
                    >
                      <input
                        type="radio" name="delivery" value={d.id}
                        checked={form.delivery === d.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="text-2xl">{d.icon}</span>
                      <div>
                        <p className="text-white font-semibold">{d.label}</p>
                        <p className="text-neutral-400 text-sm">{d.desc}</p>
                      </div>
                      <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        form.delivery === d.id ? 'border-lime-400' : 'border-neutral-600'
                      }`}>
                        {form.delivery === d.id && <div className="w-2.5 h-2.5 rounded-full bg-lime-400" />}
                      </div>
                    </label>
                  ))}
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Місто *</label>
                  <input
                    type="text" name="city" value={form.city} onChange={handleChange}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-lime-400 focus:outline-none transition-colors"
                    placeholder="Київ"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">
                    {form.delivery === 'nova-poshta' ? 'Номер відділення / поштомат' : 'Адреса'} *
                  </label>
                  <input
                    type="text" name="address" value={form.address} onChange={handleChange}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-lime-400 focus:outline-none transition-colors"
                    placeholder={form.delivery === 'nova-poshta' ? 'Відділення №1' : 'вул. Хрещатик, 1'}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 bg-neutral-800 text-white rounded-xl hover:bg-neutral-700 transition-all font-semibold"
                  >
                    ← Назад
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 rounded-xl transition-all"
                  >
                    Далі →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Оплата</h2>
                <div className="space-y-3">
                  {[
                    { id: 'card', label: 'Картка Visa/Mastercard', desc: 'Онлайн оплата', icon: '💳' },
                    { id: 'privat24', label: 'Приват24', desc: 'Оплата через Приват24', icon: '🏦' },
                    { id: 'mono', label: 'Monobank', desc: 'Оплата через Monobank', icon: '📱' },
                    { id: 'cash', label: 'Накладений платіж', desc: 'Оплата при отриманні', icon: '💵' },
                  ].map((p) => (
                    <label
                      key={p.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        form.payment === p.id
                          ? 'border-lime-400 bg-lime-400/5'
                          : 'border-neutral-700 hover:border-neutral-600'
                      }`}
                    >
                      <input
                        type="radio" name="payment" value={p.id}
                        checked={form.payment === p.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="text-2xl">{p.icon}</span>
                      <div>
                        <p className="text-white font-semibold">{p.label}</p>
                        <p className="text-neutral-400 text-sm">{p.desc}</p>
                      </div>
                      <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        form.payment === p.id ? 'border-lime-400' : 'border-neutral-600'
                      }`}>
                        {form.payment === p.id && <div className="w-2.5 h-2.5 rounded-full bg-lime-400" />}
                      </div>
                    </label>
                  ))}
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Коментар до замовлення</label>
                  <textarea
                    name="comment" value={form.comment} onChange={handleChange} rows={3}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-lime-400 focus:outline-none transition-colors resize-none"
                    placeholder="Додаткові побажання..."
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-neutral-800 text-white rounded-xl hover:bg-neutral-700 transition-all font-semibold"
                  >
                    ← Назад
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 rounded-xl transition-all text-lg"
                  >
                    Підтвердити замовлення
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4">Ваше замовлення</h3>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.slug} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-800 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                      <p className="text-neutral-400 text-sm">{item.quantity} × ₴{item.price.toLocaleString('uk-UA')}</p>
                    </div>
                    <p className="text-white font-semibold text-sm">
                      ₴{(item.price * item.quantity).toLocaleString('uk-UA')}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-neutral-800 pt-4 space-y-2">
                <div className="flex justify-between text-neutral-400 text-sm">
                  <span>Доставка</span>
                  <span className="text-lime-400">Безкоштовно</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Разом</span>
                  <span>₴{total.toLocaleString('uk-UA')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
