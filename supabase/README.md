# Supabase migrations

## Порядок виконання (для свіжої БД або апгрейду)

1. **`schema.sql`** — canonical схема. Безпечна для повторного виконання.
   Містить все: products, blog_posts, orders, banners, product_faqs
   + всі колонки які з'явились пізніше (`brand`, `meta_title`,
   `meta_description`, розширений `voltage CHECK`).

2. **`migration-admin-rls.sql`** — заміняє дірявий RLS
   (`auth.role() = 'authenticated'`) на admin-gated через таблицю `admins`
   + функцію `is_admin()`. Вимагає ручного додавання admin-запису
   після виконання (див. коментарі в файлі).

## Застарілі файли (лишені для історії)

- `migration-banners.sql` — вміст злитий у `schema.sql`. Повторне виконання
  безпечне, але не потрібне.
- `migration-brand.sql` — вміст злитий у `schema.sql`. Те саме.

На свіжій БД достатньо виконати `schema.sql` → `migration-admin-rls.sql`.

## Як виконувати

Через Supabase Dashboard → SQL Editor → New query → вставити файл → Run.
Або локально через CLI: `psql $DATABASE_URL -f supabase/schema.sql`.
