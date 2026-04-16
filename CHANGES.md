# Ausom Ukraine — мобільна адаптація

Переписано 13 файлів. Усі стратегія — **класи-модифікатори в `globals.css`** (узгоджується з тим, як проект уже написаний: `.grid-4`, `.grid-3`, `.filters-bar`, `.hide-mobile` тощо вже існують).

## Брейкпоінти

- **1024px** — tablet landscape → tablet portrait (десктопний grid ламається)
- **900px** — large phone / small tablet (cart summary, compare CTA, categories переходять в 1 колонку)
- **768px** — tablet portrait → mobile (catalog grid 3 → 2)
- **640px** — mobile (footer, blog, catalog filters повністю стекають)
- **480px / 420px** — small mobile (catalog grid → 1 col, home products grid → 1 col)

## Файли для заміни

```
app/globals.css                          ← розширено, не переписано повністю
app/blog/page.tsx
app/cart/page.tsx
app/catalog/page.tsx
app/compare/compare-page.tsx
components/layout/Header.tsx             ← + bugfix: drawer hidden коли закритий
components/layout/Footer.tsx
components/sections/BlogPreview.tsx
components/sections/CatalogTabs.tsx
components/sections/Categories.tsx
components/sections/CompareCTA.tsx
components/sections/Hero.tsx
components/sections/Sections.tsx
components/ui/ProductCard.tsx
```

## Як застосувати

1. Розпакуй архів у корінь клону репо `Ausom`.
2. Файли перезапишуться 1:1 по шляхах.
3. `npm run dev`.
4. У DevTools Responsive Mode перевір: **375px, 414px, 768px, 1024px, 1440px**.

## Що зафіксовано окремо (не просто респонсив)

### Header — баг з drawer
До: drawer завжди монтувався з `transform: translateX(100%)`. На деяких мобільних браузерах це все одно перехоплювало скрол-жести / давало небажаний overflow.
Після: додано клас `.mobile-drawer` з `visibility: hidden; pointer-events: none`, який вмикається через `.is-open`. Також drawer автозакривається при зміні роуту (`useEffect` на `pathname`) — це було відсутнє.

### Body overflow-x
В `globals.css` додано `body { overflow-x: hidden }`. Це рятує від випадкового бокового скролу на мобілці, якщо будь-який дочірній елемент не вмістився (наприклад, широка таблиця).

### ProductCard
Wishlist-кнопка і "В дії →" лейбл раніше показувалися тільки на hover (через `opacity: hovered ? 1 : 0`). На мобілці hover немає — wishlist був недосяжний. Тепер:
- Wishlist на мобілці завжди видима (`.pc-wishlist { opacity: 1 !important }`).
- Лейбл "В дії →" на мобілці захований (друге фото не перемикається без hover, лейбл вводив би в оману).
- Tap-target кнопки "До кошика" збільшено до 14px padding на мобілці.

### Catalog фільтри
Раніше 3 групи фільтрів + сортувалка + view-toggle не вміщалися — робився `flexWrap:wrap` і все розлазилося по 3 рядки. Тепер: на мобілці вся стрічка фільтрів скролиться горизонтально одним рядком, view-toggle (grid/list) прихований (на мобілці тільки grid сенс має).

### Cart item
Сітка `88px | 1fr | auto` (зображення | деталі | ціна) на вузькому екрані ламалася — або ціна йшла під обрізаний заголовок, або qty-controls не вміщалися. Тепер на мобілці:
- `72px | 1fr` (image + info поруч)
- ціна+стара ціна йдуть на другий рядок, відокремлені тонкою лінією

### Compare table
Таблиця вже мала `overflow-x: auto` — залишено, додано:
- клас-обгортку `.compare-table-wrap` (уніфіковано з іншими responsive правилами)
- візуальну підказку "↔ Таблиця прокручується горизонтально" над таблицею (нагадує touch-користувачам, що можна свайпнути)

### Sections — Marquee Press
Картки в `Press` були фіксовано 300px. На дуже вузьких екранах (iPhone SE ~375px) одна картка займала майже весь екран. Тепер `width: min(300px, 80vw)` — на малих екранах залишається видно шматочок наступної картки як візуальний hint що це скрол.

## Несподіваностей у TS-типах не буде

Жодна зміна не торкалася:
- `lib/types.ts` / `Product` тип
- `lib/cart.tsx` / `useCart` API
- `lib/data.ts`
- Props компонентів

Всі переписи зберегли оригінальні імпорти, пропси і логіку.
