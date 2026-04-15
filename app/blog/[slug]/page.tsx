import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'

const POSTS: Record<string, {
  title: string; cat: string; date: string; read: number; content: string[]; banner?: string
}> = {
  'best-scooters-heavy-adults-2026': {
    banner: 'https://pl.ausomstore.com/cdn/shop/files/DT2_Pro.jpg?v=1767606498',
    banner: 'https://pl.ausomstore.com/cdn/shop/files/DT2_Pro.jpg?v=1767606498',
    title: 'Найкращі електросамокати для важких дорослих у 2026',
    cat: 'Огляди', date: '30 берез. 2026', read: 6,
    content: [
      'Шукаєш самокат з великим навантаженням? Ця стаття для тебе. Ми зібрали найкращі моделі з подвійним мотором та посиленою рамою, які витримують навантаження до 150 кг.',
      'Ausom DT2 Pro — абсолютний лідер у цій категорії. Завдяки подвійному мотору 2×800W та позашляховій підвісці, він справляється з будь-якими умовами. Максимальне навантаження — 150 кг, запас ходу — 70 км.',
      'Ausom L2 Max Dual Motor — відмінний вибір для міських поїздок. Подвійний мотор 2×800W, 85 км запасу ходу та навантаження до 120 кг роблять його ідеальним для щоденних поїздок.',
      'При виборі самоката для великого навантаження зверни увагу на: максимальне навантаження (має бути мінімум 120 кг), тип рами (посилена сталева або алюмінієва), наявність подвійного мотора для кращого розгону та тягу.',
      'Підсумок: для максимального комфорту обирай Ausom DT2 Pro — він поєднує потужність, надійність та позашляховий характер.',
    ],
  },
  '10-features-buying-scooter': {
    banner: 'https://pl.ausomstore.com/cdn/shop/files/l2-max-dual-detail-page-mobile.jpg?v=1765511614',
    banner: 'https://pl.ausomstore.com/cdn/shop/files/l2-max-dual-detail-page-mobile.jpg?v=1765511614',
    title: '10 ключових характеристик при виборі електросамоката',
    cat: 'Гід покупця', date: '30 берез. 2026', read: 8,
    content: [
      'Вибір електросамоката може бути складним завданням. Ринок пропонує десятки моделей з різними характеристиками. Ми виділили 10 ключових параметрів, на які варто звернути увагу.',
      '1. Потужність мотора — визначає динаміку розгону та здатність долати підйоми. Для міста достатньо 500-800W, для бездоріжжя — 1000W+.',
      '2. Запас ходу — реальний діапазон зазвичай на 20-30% менший за заявлений. Обирай самокат із запасом.',
      '3. Акумулятор (Wh) — чим більше Wh, тим далі поїдеш. Для міста достатньо 400-600 Wh, для дальніх поїздок — 800+ Wh.',
      '4. Гальма — гідравлічні гальма Zoom забезпечують найкращу зупинку. Уникай моделей лише з електронним гальмуванням.',
      '5. Підвіска — подвійна підвіска критична для нерівних доріг та бездоріжжя.',
      '6. Максимальне навантаження — враховуй свою вагу плюс речі.',
      '7. Вага самоката — важливо якщо часто переносиш у транспорті.',
      '8. IP-рейтинг водостійкості — мінімум IPX4 для дощових умов.',
      '9. Тип шин — пневматичні значно комфортніші за суцільні.',
      '10. Сервісна підтримка — обирай офіційних дилерів з гарантією та сервісним центром.',
    ],
  },
  'best-adult-scooter-2026-guide': {
    banner: 'https://pl.ausomstore.com/cdn/shop/files/dt2-pro-detail-page-mobile.jpg?v=1765510548',
    banner: 'https://pl.ausomstore.com/cdn/shop/files/800_1200-wuzi.jpg?v=1772768149',
    title: 'Найкращий електросамокат для дорослих 2026: повний гід',
    cat: 'Порівняння', date: '30 берез. 2026', read: 10,
    content: [
      'У 2026 році ринок електросамокатів значно виріс. Ми порівняли всі моделі Ausom, щоб допомогти тобі зробити правильний вибір.',
      'Ausom L1 — найдоступніша модель. Ідеальна для початківців та коротких міських поїздок. Вага 20 кг, запас ходу 50 км, швидкість до 45 км/год. Ціна: ₴27 050.',
      'Ausom L2 Dual Motor — середній клас. Подвійний мотор дає кращу тягу та розгін. Запас ходу 70 км, швидкість до 55 км/год. Ціна: ₴32 200.',
      'Ausom L2 Max Dual Motor — максимальний запас ходу в класі (85 км). Ідеальний для тих, хто часто їде далеко від розетки. Ціна: ₴40 800.',
      'Ausom DT2 Pro — флагман для позашляхових пригод. 52V, 70 км, 65 км/год, гідравлічні гальма Zoom. Ціна: ₴44 250.',
      'Наш вибір: якщо потрібна максимальна універсальність — Ausom DT2 Pro. Для міста — L2 Dual Motor. Для бюджету — L1.',
    ],
  },
  'dt2-pro-review': {
    banner: 'https://pl.ausomstore.com/cdn/shop/files/DT2_Pro.jpg?v=1767606498',
    banner: 'https://pl.ausomstore.com/cdn/shop/files/DT2_Pro.jpg?v=1767606498',
    title: 'DT2 Pro: детальний огляд позашляхового самоката',
    cat: 'Огляди', date: '15 берез. 2026', read: 12,
    content: [
      'Ausom DT2 Pro — позашляховий самокат преміум класу. Ми провели тижень тестувань у різних умовах: місто, бездоріжжя, підйоми, дощ.',
      'Дизайн та збірка: масивна рама, широкі позашляхові шини 11", подвійна підвіска. Самокат виглядає потужно і так само відчувається під ногами.',
      'Продуктивність: двигун 2×800W дає відчутний розгін. 0-30 км/год приблизно за 4 секунди. Максимальна швидкість 65 км/год у тестових умовах.',
      'Запас ходу: у змішаному режимі (місто + трохи бездоріжжя) отримали 58-62 км. Заявлені 70 км реальні при їзді по рівному асфальту.',
      'Гальма: гідравлічні Zoom — найкраща система на ринку. Зупинка чітка та передбачувана навіть на швидкості 60+ км/год.',
      'Підвіска: подвійна подвіска чудово справляється з бруківкою та невеликими перешкодами. На справжньому бездоріжжі комфортно на швидкості до 30 км/год.',
      'Висновок: Ausom DT2 Pro — найкращий варіант якщо потрібен універсальний самокат для міста та бездоріжжя. Рекомендуємо.',
    ],
  },
  'city-commuter-guide': {
    banner: 'https://pl.ausomstore.com/cdn/shop/files/l1-max-page-mobile.jpg?v=1765511227',
    banner: 'https://pl.ausomstore.com/cdn/shop/files/k20_pro_listing_800_1000_m.jpg?v=1774004078',
    title: 'Як обрати міський самокат для щоденних поїздок',
    cat: 'Поради', date: '10 берез. 2026', read: 7,
    content: [
      'Міський самокат — це інструмент для щоденних поїздок. Тут важлива не максимальна швидкість, а комфорт, надійність та практичність.',
      'Для міста рекомендуємо зосередитися на: запасі ходу (мінімум 40-50 км), вазі (до 25 кг), наявності підвіски для комфорту на бруківці, LED освітленні.',
      'Ausom L1 — ідеальний старт. Легкий (20 кг), компактний, 50 км запасу ходу. Складається за 3 секунди — зручно в транспорті.',
      'Ausom L2 Dual Motor — якщо потрібно більше потужності та запасу ходу. 70 км та подвійний мотор для впевненого розгону в потоці.',
      'Практичні поради: заряджай щовечора, стеж за тиском шин, зберігай у приміщенні взимку. Регулярне обслуговування продовжить термін служби вдвічі.',
    ],
  },
  'e-scooter-maintenance-tips': {
    banner: 'https://pl.ausomstore.com/cdn/shop/files/l2-max-dual-detail-page-mobile.jpg?v=1765511614',
    banner: 'https://pl.ausomstore.com/cdn/shop/files/l1-max-page-mobile.jpg?v=1765511227',
    title: 'Догляд за електросамокатом: 8 важливих порад',
    cat: 'Поради', date: '5 берез. 2026', read: 5,
    content: [
      'Правильний догляд продовжує термін служби самоката та зберігає гарантію. Ось 8 порад від нашої команди.',
      '1. Заряджай регулярно — не доводь акумулятор до 0%. Оптимальний діапазон зарядки: 20-90%.',
      '2. Зберігай у приміщенні — низькі температури шкодять акумулятору. Мінімальна температура зберігання: +5°C.',
      '3. Перевіряй тиск шин щотижня — правильний тиск покращує запас ходу та комфорт.',
      '4. Чисти після кожної поїздки по бруду — особливо гальмівні диски та підшипники.',
      '5. Перевіряй затягнення болтів раз на місяць — вібрація може послаблювати з\'єднання.',
      '6. Масти ланцюг (якщо є) раз на 200 км.',
      '7. Не мий водою під тиском — навіть IPX5 самокати не призначені для мийки Karcher.',
      '8. Звертайся до сервісу при перших ознаках проблем — дрібна поломка вчасно виявлена обходиться дешевше.',
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(POSTS).map(slug => ({ slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) notFound()

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>

      {/* Hero banner */}
      {post.banner && (
        <div style={{ position:'relative', height:360, overflow:'hidden' }}>
          <Image src={post.banner} alt={post.title} fill sizes="100vw" style={{ objectFit:'cover', objectPosition:'center top' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,.3) 0%, rgba(0,0,0,.7) 100%)' }}/>
          <div className="w-container" style={{ position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', justifyContent:'flex-end', paddingBottom:40 }}>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:'#F5C200', background:'rgba(245,194,0,.15)', border:'1px solid rgba(245,194,0,.3)', padding:'4px 12px', borderRadius:4, display:'inline-block', marginBottom:14, width:'fit-content' }}>{post.cat}</span>
            <h1 style={{ fontSize:'clamp(24px,3.5vw,44px)', fontWeight:800, letterSpacing:'-.025em', color:'#fff', lineHeight:1.1, maxWidth:700, marginBottom:14 }}>{post.title}</h1>
            <div style={{ display:'flex', alignItems:'center', gap:16, fontSize:13, color:'rgba(255,255,255,.6)' }}>
              <span style={{ display:'flex', alignItems:'center', gap:5 }}>📅 {post.date}</span>
              <span style={{ display:'flex', alignItems:'center', gap:5 }}>⏱ {post.read} хв читання</span>
            </div>
          </div>
        </div>
      )}

      {/* Header (fallback when no banner) */}
      {!post.banner && <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'48px 0 40px' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)', marginBottom:20 }}>
            <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
            <span>/</span>
            <Link href="/blog" style={{ color:'var(--text-3)', textDecoration:'none' }}>Блог</Link>
            <span>/</span>
            <span style={{ color:'var(--text)', fontWeight:500 }}>{post.cat}</span>
          </div>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'#8B6800', background:'#FFF3CC', border:'1px solid #F5C200', padding:'4px 12px', borderRadius:4, display:'inline-block', marginBottom:20 }}>
            {post.cat}
          </span>
          <h1 style={{ fontSize:'clamp(28px,4vw,52px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', lineHeight:1.1, maxWidth:800, marginBottom:16 }}>
            {post.title}
          </h1>
          <div style={{ display:'flex', alignItems:'center', gap:20, fontSize:13, color:'var(--text-3)' }}>
            <span style={{ display:'flex', alignItems:'center', gap:6 }}><Calendar size={13}/>{post.date}</span>
            <span style={{ display:'flex', alignItems:'center', gap:6 }}><Clock size={13}/>{post.read} хв читання</span>
          </div>
        </div>
      </div>}

      {/* Content */}
      <div className="w-container" style={{ padding:'48px 40px 80px' }}>
        <div style={{ maxWidth:720 }}>
          <Link href="/blog" style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:13, fontWeight:500, color:'var(--text-3)', textDecoration:'none', marginBottom:40 }}>
            <ArrowLeft size={14}/> До всіх статей
          </Link>

          {/* Hero image */}
          {post.banner && (
            <div style={{ position:'relative', width:'100%', aspectRatio:'16/7', borderRadius:16, overflow:'hidden', marginBottom:40 }}>
              <Image src={post.banner} alt={post.title} fill sizes="(max-width:768px) 100vw, 720px" style={{ objectFit:'cover' }}/>
            </div>
          )}

          {post.content.map((paragraph, i) => (
            <p key={i} style={{
              fontSize: i === 0 ? 18 : 16,
              fontWeight: i === 0 ? 500 : 400,
              color: i === 0 ? 'var(--text-2)' : 'var(--text-2)',
              lineHeight: 1.8,
              marginBottom: 24,
            }}>
              {paragraph}
            </p>
          ))}

          <div style={{ marginTop:48, padding:'28px 32px', background:'#FFF3CC', border:'1.5px solid #F5C200', borderRadius:12 }}>
            <p style={{ fontSize:14, fontWeight:700, color:'#8B6800', marginBottom:8 }}>Потрібна консультація?</p>
            <p style={{ fontSize:14, color:'#8B6800', marginBottom:16 }}>Наша команда допоможе обрати найкращу модель для тебе.</p>
            <Link href="/catalog" className="btn btn-yellow btn-sm">Переглянути самокати</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
