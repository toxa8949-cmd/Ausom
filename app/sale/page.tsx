'use client';

import Link from 'next/link';
import Image from 'next/image';

const saleProducts = [
  {
    slug: 'l1', name: 'Ausom L1', price: 27050, oldPrice: 33800, discount: 6750,
    speed: '45 км/год', range: '50 км', battery: '468 Wh',
    image: 'https://pl.ausomstore.com/cdn/shop/files/l1-max-page-mobile.jpg?v=1765511227',
  },
  {
    slug: 'l2-dual', name: 'Ausom L2 Dual Motor', price: 32200, oldPrice: 40250, discount: 8050,
    speed: '55 км/год', range: '70 км', battery: '768 Wh',
    image: 'https://pl.ausomstore.com/cdn/shop/files/800_1200-wuzi.jpg?v=1772768149',
  },
  {
    slug: 'l2-max-dual', name: 'Ausom L2 Max Dual Motor', price: 40800, oldPrice: 51000, discount: 10200,
    speed: '55 км/год', range: '85 км', battery: '960 Wh', badge: 'Хіт',
    image: 'https://pl.ausomstore.com/cdn/shop/files/Gosoul_2_pro1800X1000_ad23b595-61fb-4c72-88cf-ec2be4688b74.jpg?v=1774003576',
  },
  {
    slug: 'dt2-pro', name: 'Ausom DT2 Pro', price: 44250, oldPrice: 55300, discount: 11050,
    speed: '65 км/год', range: '70 км', battery: '1066 Wh', badge: 'Топ',
    image: 'https://pl.ausomstore.com/cdn/shop/files/DT2_Pro.jpg?v=1767606498',
  },
];

export default function SalePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-neutral-950 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Головна</Link>
            <span>/</span>
            <span className="text-white">Розпродаж</span>
          </nav>

          <div className="bg-gradient-to-br from-red-500/20 via-neutral-900 to-orange-500/10 border border-red-500/30 rounded-3xl p-8 md:p-12 text-center mb-12">
            <span className="inline-block bg-red-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              🔥 ВЕСНЯНИЙ РОЗПРОДАЖ
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Знижки до ₴11 050
            </h1>
            <p className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto mb-6">
              Всі моделі Ausom зі знижкою −20%. Безкоштовна доставка та офіційна гарантія 2 роки.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-400">
              <span className="flex items-center gap-1">✓ Безкоштовна доставка</span>
              <span className="flex items-center gap-1">✓ Гарантія 2 роки</span>
              <span className="flex items-center gap-1">✓ 14 днів повернення</span>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/product/${p.slug}`}
                className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all"
              >
                <div className="relative aspect-square">
                  <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    −₴{p.discount.toLocaleString('uk-UA')}
                  </span>
                  {(p as any).badge && (
                    <span className="absolute top-3 right-3 bg-lime-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                      {(p as any).badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-red-400 transition-colors">
                    {p.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs text-neutral-400 mb-3">
                    <span className="bg-neutral-800 px-2 py-1 rounded">{p.speed}</span>
                    <span className="bg-neutral-800 px-2 py-1 rounded">{p.range}</span>
                    <span className="bg-neutral-800 px-2 py-1 rounded">{p.battery}</span>
                  </div>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-white font-bold text-xl">₴{p.price.toLocaleString('uk-UA')}</span>
                    <span className="text-neutral-500 line-through text-sm">₴{p.oldPrice.toLocaleString('uk-UA')}</span>
                  </div>
                  <span className="block w-full text-center bg-red-500 hover:bg-red-400 text-white font-bold py-2.5 rounded-xl transition-all text-sm">
                    Купити зі знижкою
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
