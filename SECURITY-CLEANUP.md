# 🔐 Security cleanup — P0 checklist

Порядок дій після застосування патчу. Треба виконати **повністю**, інакше сенсу мало.

---

## 1. Прибрати `.env.local` та `tsconfig.tsbuildinfo` з git

```bash
# В корені репо, після того як скопіюєш новий .gitignore і .env.example:

git rm --cached .env.local
git rm --cached tsconfig.tsbuildinfo

git add .gitignore .env.example
git commit -m "chore: add .gitignore, stop tracking env/build artifacts"
git push
```

Після цього `.env.local` залишиться на диску (і далі буде працювати локально), але більше не потрапляє в коміти.

---

## 2. Ротувати Supabase anon key

**Чому**: `NEXT_PUBLIC_SUPABASE_ANON_KEY` досі лежить у комітах `e59b61b` та `15599c0`. Навіть якщо зараз видалити — в історії він назавжди (поки не rewrite'ish історію, що ламає всім клонам працю).

Сам по собі anon key не страшний — він ДОЗВОЛЕНИЙ до експозиції, RLS зупиняє зловживання. **Але** тільки якщо RLS правильно налаштований. У вас до цього патчу RLS був дірявий (`auth.role() = 'authenticated'` дозволяв будь-якому реєстрованому юзеру писати в продукти). Тому ротація — гігієна.

**Як**:
1. Supabase Dashboard → Settings → API
2. Кнопка **Generate new anon key** (або Reset API keys)
3. Скопіюй новий ключ
4. **Локально**: онови `.env.local`
5. **Vercel**: Project → Settings → Environment Variables → онови `NEXT_PUBLIC_SUPABASE_ANON_KEY` у всіх трьох середовищах (Production, Preview, Development) → Redeploy

---

## 3. Застосувати нові RLS

```bash
# Через Supabase Dashboard → SQL Editor → New Query
# Вставити послідовно ДВА файли з патчу:
#   1. supabase/schema.sql             (оновлює структуру, безпечно для існуючих даних)
#   2. supabase/migration-admin-rls.sql (заміняє дірявий RLS на admin-gated)
```

Або через CLI:
```bash
psql "$DATABASE_URL" -f supabase/schema.sql
psql "$DATABASE_URL" -f supabase/migration-admin-rls.sql
```

---

## 4. Створити admin-запис

Одразу після застосування RLS:

```sql
-- В Supabase SQL Editor. Замінити UUID на реальний від твого admin-акаунта.
-- Якщо admin-акаунт ще не створений — створи через Dashboard → Authentication → Users → Add user
-- Потім:
SELECT id, email FROM auth.users WHERE email = 'your-admin@email.com';
-- Скопіюй id і встав у:
INSERT INTO admins (user_id, email, note)
VALUES ('<uuid-звідси>', 'your-admin@email.com', 'Primary admin');
```

Перевір:
```sql
SELECT * FROM admins;
```

---

## 5. Вимкнути публічну реєстрацію

Supabase Dashboard → Authentication → Providers → Email:
- **Enable Email provider**: ON (потрібно для login)
- **Enable Signups**: **OFF** ← критично

Тепер нові юзери можуть з'явитись у `auth.users` тільки через твою інвайт-процедуру з Dashboard.

---

## 6. Верифікація

### 6a. Перевір що anon не може писати в products
У браузері на `ausom.in.ua` відкрий DevTools → Console:
```js
// Скопіюй ці значення з .env.local (нові, після ротації)
const url = 'https://rcirgvbmzjignbahckbt.supabase.co'
const key = '<NEW_ANON_KEY>'

fetch(`${url}/rest/v1/products`, {
  method: 'POST',
  headers: {
    'apikey': key,
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  },
  body: JSON.stringify({ name: 'HACK', slug: 'hack', price: 1,
    category: 'commuter', voltage: '48v', motor: 'single',
    range_km: 1, max_speed: 1, weight_kg: 1, max_load_kg: 1, battery_wh: 1
  })
}).then(r => r.json()).then(console.log)
```
Очікуваний результат: `{ code: '42501', message: 'new row violates row-level security policy' }` ✅

### 6b. Перевір що admin може
Залогінься в `/admin/login`, створи тестовий продукт через адмінку → має вдатись.

### 6c. Перевір що неадмін не може
Створи другий акаунт (через Dashboard → Invite user, на inbox без `admins` запису). Залогінься ним у `/admin/login`:
- Клієнтський guard зараз його пропустить (бо checking клієнтський — це окрема P1 задача)
- Але **будь-який запис у БД впаде 42501** — бо `admins` запису немає
- Це вже достатньо для P0. Повний server-side guard зробимо наступним кроком.

---

## 7. (опціонально, агресивно) Переписати git-історію

Якщо критично важливо, щоб старий anon key щез із історії **назавжди**:

```bash
# УВАГА: ламає всі існуючі клони та PR'и. Переконайся що ти один на проекті.
pip install git-filter-repo
git filter-repo --path .env.local --invert-paths --force
git push --force-with-lease
```

Після цього попроси GitHub очистити кеш (через Support) — іноді вони тримають старі refs.

**Моя думка**: не робити. Ротувати ключ — достатньо. filter-repo часто створює більше проблем (поламані refs у Vercel, кинуті feature-branches), ніж вирішує.

---

## 8. Що лишилося після P0

Зроблено:
- ✅ Секрети не комітяться
- ✅ RLS закриті на admin-only
- ✅ Публічна реєстрація вимкнена
- ✅ Схема БД синхронізована з кодом

Не зроблено (P1, наступний крок):
- ❌ Server-side admin guard (`middleware.ts` + `@supabase/ssr`)
- ❌ Public catalog використовує клієнтський supabase — переноси на server components
- ❌ `lucide-react@^1.8.0` в package.json — скоріш за все помилка, має бути `^0.400+`

Пінгуй коли готовий йти в P1.
