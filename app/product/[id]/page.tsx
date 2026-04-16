'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const products: Record<string, any> = {
  'l1': {
    name: 'Ausom L1',
    slug: 'l1',
    price: 27050,
    oldPrice: 33800,
    discount: 20,
    voltage: '48V',
    speed: '45 км/год',
    range: '50 км',
    battery: '468 Wh',
    weight: '23 кг',
    motor: '500W',
    motorType: 'Одиночний',
    wheels: '10"',
    maxLoad: '120 кг',
    charging: '6-7 годин',
    brakes: 'Дискові',
    suspension: 'Передня + задня',
    waterproof: 'IP54',
    display: 'LCD дисплей',
    folded: '113 × 50 × 52 см',
    unfolded: '113 × 50 × 120 см',
    badge: null,
    category: 'commuter',
    description: 'Ідеальний міський самокат для щоденних поїздок. Легкий, компактний та надійний — ваш перший крок до електромобільності.',
    features: [
      'Потужний мотор 500W для комфортної їзди містом',
      'Запас ходу 50 км — вистачить на тиждень поїздок',
      'Складна конструкція — легко перевозити в транспорті',
      'Амортизація спереду і ззаду для м\'якої їзди',
      'IP54 захист від вологи та пилу',
    ],
    images: [
      'https://pl.ausomstore.com/cdn/shop/files/l1-max-page-mobile.jpg?v=1765511227',
      'https://pl.ausomstore.com/cdn/shop/files/k20_pro_listing_800_1000_m.jpg?v=1774004078',
    ],
  },
  'l2-dual': {
    name: 'Ausom L2 Dual Motor',
    slug: 'l2-dual',
    price: 32200,
    oldPrice: 40250,
    discount: 20,
    voltage: '48V',
    speed: '55 км/год',
    range: '70 км',
    battery: '768 Wh',
    weight: '28 кг',
    motor: '2×500W',
    motorType: 'Подвійний',
    wheels: '10"',
    maxLoad: '150 кг',
    charging: '7-8 годин',
    brakes: 'Дискові гідравлічні',
    suspension: 'Подвійна амортизація',
    waterproof: 'IP54',
    display: 'LCD дисплей',
    folded: '120 × 55 × 55 см',
    unfolded: '120 × 55 × 125 см',
    badge: null,
    category: 'commuter',
    description: 'Баланс потужності та автономності. Подвійний мотор для впевненого підйому на горби та комфортної їзди на великі дистанції.',
    features: [
      'Подвійний мотор 2×500W — потужність на кожне колесо',
      'Запас ходу 70 км — для серйозних маршрутів',
      'Гідравлічні гальма для безпечного гальмування',
      'Подвійна амортизація — комфорт на будь-якій дорозі',
      'Максимальне навантаження 150 кг',
    ],
    images: [
      'https://pl.ausomstore.com/cdn/shop/files/800_1200-wuzi.jpg?v=1772768149',
      'https://pl.ausomstore.com/cdn/shop/files/800x1000_0936ab86-a006-46f0-b540-fddd9d2028dc.jpg?v=1772504724',
    ],
  },
  'l2-max-dual': {
    name: 'Ausom L2 Max Dual Motor',
    slug: 'l2-max-dual',
    price: 40800,
    oldPrice: 51000,
    discount: 20,
    voltage: '48V',
    speed: '55 км/год',
    range: '85 км',
    battery: '960 Wh',
    weight: '32 кг',
    motor: '2×600W',
    motorType: 'Подвійний',
    wheels: '11"',
    maxLoad: '150 кг',
    charging: '8-9 годин',
    brakes: 'Дискові гідравлічні',
    suspension: 'Подвійна амортизація',
    waterproof: 'IP54',
    display: 'LCD дисплей',
    folded: '125 × 58 × 56 см',
    unfolded: '125 × 58 × 128 см',
    badge: 'Хіт',
    category: 'offroad',
    description: 'Максимальна автономність у лінійці. 85 км на одному заряді, подвійний мотор та посилена батарея — для тих, хто їде далеко.',
    features: [
      'Рекордний запас ходу 85 км на одному заряді',
      'Батарея 960 Wh — найпотужніша в лінійці L-серії',
      'Подвійний мотор 2×600W для впевненого руху',
      '11-дюймові колеса для кращого зчеплення',
      'Ідеальний для далеких поїздок та подорожей',
    ],
    images: [
      'https://pl.ausomstore.com/cdn/shop/files/Gosoul_2_pro1800X1000_ad23b595-61fb-4c72-88cf-ec2be4688b74.jpg?v=1774003576',
      'https://pl.ausomstore.com/cdn/shop/files/l2-max-dual-detail-page-mobile.jpg?v=1765511614',
    ],
  },
  'dt2-pro': {
    name: 'Ausom DT2 Pro',
    slug: 'dt2-pro',
    price: 44250,
    oldPrice: 55300,
    discount: 20,
    voltage: '52V',
    speed: '65 км/год',
    range: '70 км',
    battery: '1066 Wh',
    weight: '34 кг',
    motor: '2×800W',
    motorType: 'Подвійний',
    wheels: '11"',
    maxLoad: '150 кг',
    charging: '9-10 годин',
    brakes: 'Дискові гідравлічні',
    suspension: 'Подвійна амортизація з регулюванням',
    waterproof: 'IP55',
    display: 'LCD кольоровий дисплей',
    folded: '130 × 60 × 58 см',
    unfolded: '130 × 60 × 132 см',
    badge: 'Топ',
    category: 'offroad',
    description: 'Флагман Ausom. Подвійний мотор 2×800W, батарея 1066 Wh, швидкість 65 км/год. Створений для тих, хто хоче максимум.',
    features: [
      'Подвійний мотор 2×800W — потужність для бездоріжжя',
      'Швидкість до 65 км/год — найшвидший в лінійці',
      'Батарея 1066 Wh для тривалих поїздок',
      'Регульована підвіска для будь-якого рельєфу',
      'IP55 захист — їзда в будь-яку погоду',
    ],
    images: [
      'https://pl.ausomstore.com/cdn/shop/files/DT2_Pro.jpg?v=1767606498',
      'https://pl.ausomstore.com/cdn/shop/files/dt2-pro-detail-page-mobile.jpg?v=1765510548',
    ],
  },
};

const allProducts = Object.values(products);

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products[params.id];
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'features' | 'specs'>('features');

  if (!product) {
    notFound();
  }

  const otherProducts = allProducts.filter(p => p.slug !== product.slug).slice(0, 3);

  const specs = [
    { label: 'Мотор', value: product.motor },
    { label: 'Тип мотора', value: product.motorType },
    { label: 'Макс. швидкість', value: product.speed },
    { label: 'Запас ходу', value: product.range },
    { label: 'Батарея', value: `${product.voltage}, ${product.battery}` },
    { label: 'Колеса', value: product.wheels },
    { label: 'Макс. навантаження', value: product.maxLoad },
    { label: 'Вага', value: product.weight },
    { label: 'Час заряджання', value: product.charging },
    { label: 'Гальма', value: product.brakes },
    { label: 'Підвіска', value: product.suspension },
    { label: 'Захист від вологи', value: product.waterproof },
    { label: 'Дисплей', value: product.display },
    { label: 'Розміри (складений)', value: product.folded },
    { label: 'Розміри (розкладений)', value: product.unfolded },
  ];

  const handleAddToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('ausom-cart') || '[]');
      const existing = cart.find((item: any) => item.slug === product.slug);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.images[0],
          quantity,
        });
      }
      localStorage.setItem('ausom-cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cart-updated'));
      alert(`${product.name} додано до кошика!`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-neutral-950 pt-4 pb-0">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors">Головна</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-white transition-colors">Каталог</Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="bg-neutral-950 py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                {product.badge && (
                  <span className="absolute top-4 left-4 z-10 bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
                <span className="absolute top-4 right-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  −{product.discount}%
                </span>
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex gap-3">
                {product.images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === i ? 'border-lime-400' : 'border-neutral-700 hover:border-neutral-500'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <p className="text-lime-400 text-sm font-semibold mb-2 tracking-wider uppercase">
                  {product.category === 'offroad' ? 'Позашляховий' : 'Міський'}
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                  {product.name}
                </h1>
                <p className="text-neutral-400 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: '⚡', label: 'Швидкість', value: product.speed },
                  { icon: '🔋', label: 'Запас ходу', value: product.range },
                  { icon: '🔌', label: 'Батарея', value: product.battery },
                  { icon: '⚖️', label: 'Вага', value: product.weight },
                ].map((spec) => (
                  <div key={spec.label} className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-center">
                    <span className="text-xl mb-1 block">{spec.icon}</span>
                    <p className="text-neutral-500 text-xs">{spec.label}</p>
                    <p className="text-white font-semibold text-sm">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    ₴{product.price.toLocaleString('uk-UA')}
                  </span>
                  <span className="text-xl text-neutral-500 line-through">
                    ₴{product.oldPrice.toLocaleString('uk-UA')}
                  </span>
                  <span className="bg-red-500/20 text-red-400 text-sm font-semibold px-2 py-0.5 rounded-md">
                    −₴{(product.oldPrice - product.price).toLocaleString('uk-UA')}
                  </span>
                </div>

                {/* Quantity + Add to cart */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex items-center bg-neutral-800 rounded-xl border border-neutral-700">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 text-white hover:text-lime-400 transition-colors text-lg"
                    >
                      −
                    </button>
                    <span className="px-4 py-3 text-white font-semibold min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 text-white hover:text-lime-400 transition-colors text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 px-8 rounded-xl transition-all text-lg"
                  >
                    Додати до кошика
                  </button>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-neutral-400">
                  <span className="flex items-center gap-1">✓ Безкоштовна доставка</span>
                  <span className="flex items-center gap-1">✓ Гарантія 2 роки</span>
                  <span className="flex items-center gap-1">✓ 14 днів повернення</span>
                </div>
              </div>

              {/* Buy now */}
              <Link
                href="/checkout"
                onClick={handleAddToCart}
                className="block w-full text-center bg-white hover:bg-neutral-100 text-black font-bold py-3 px-8 rounded-xl transition-all text-lg border border-neutral-300"
              >
                Купити зараз
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs: Features / Specs */}
      <section className="bg-neutral-950 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 mb-8 bg-neutral-900 rounded-xl p-1 max-w-md">
            <button
              onClick={() => setActiveTab('features')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all text-sm ${
                activeTab === 'features'
                  ? 'bg-lime-400 text-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Переваги
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all text-sm ${
                activeTab === 'specs'
                  ? 'bg-lime-400 text-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Характеристики
            </button>
          </div>

          {activeTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-neutral-900 border border-neutral-800 rounded-xl p-5"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-lime-400/20 text-lime-400 rounded-lg flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-neutral-300 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
              {specs.map((spec, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center px-6 py-4 ${
                    i !== specs.length - 1 ? 'border-b border-neutral-800' : ''
                  }`}
                >
                  <span className="text-neutral-400">{spec.label}</span>
                  <span className="text-white font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      <section className="bg-neutral-950 pb-16 border-t border-neutral-800 pt-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Інші моделі</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/product/${p.slug}`}
                className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all"
              >
                <div className="relative aspect-square">
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    −{p.discount}%
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-lime-400 transition-colors">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-neutral-400 mb-3">
                    <span>{p.speed}</span>
                    <span>•</span>
                    <span>{p.range}</span>
                    <span>•</span>
                    <span>{p.battery}</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-white font-bold text-xl">₴{p.price.toLocaleString('uk-UA')}</span>
                    <span className="text-neutral-500 line-through text-sm">₴{p.oldPrice.toLocaleString('uk-UA')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
