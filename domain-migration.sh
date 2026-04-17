#!/bin/bash
# ============================================================
# Domain migration: ausom.vercel.app / ausom.ua → ausom.in.ua
# ============================================================
# Запускати з корня проекту:
#   cd /path/to/Ausom
#   bash domain-migration.sh
#
# Що робить:
#   1. Замінює 'ausom.vercel.app' → 'ausom.in.ua' у всіх .tsx/.ts/.md
#   2. Замінює email '@ausom.ua' → '@ausom.in.ua'
#   3. НЕ чіпає 'ausomstore.com' (CDN фото виробника — лишається)
#   4. НЕ чіпає '@/lib/...' (це alias-імпорти Next.js)
#
# Безпечно: перед заміною робить backup у .backup-domain-migration/
# ============================================================

set -e

echo "🔍 Перевіряю що запускаємо з корня проекту..."
if [ ! -f "next.config.ts" ] && [ ! -f "next.config.js" ]; then
  echo "❌ Помилка: це не Next.js проект (немає next.config.ts). Запускай з корня."
  exit 1
fi

echo "📦 Створюю backup..."
mkdir -p .backup-domain-migration
find app components lib -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.md" \) -exec cp --parents {} .backup-domain-migration/ \; 2>/dev/null || true
echo "   Backup у .backup-domain-migration/"

echo ""
echo "🔄 Заміна 'ausom.vercel.app' → 'ausom.in.ua'..."
FILES_VERCEL=$(grep -rln "ausom\.vercel\.app" app components lib 2>/dev/null || true)
if [ -n "$FILES_VERCEL" ]; then
  echo "$FILES_VERCEL" | while read -r file; do
    sed -i 's/ausom\.vercel\.app/ausom.in.ua/g' "$file"
    echo "   ✓ $file"
  done
else
  echo "   (нічого не знайдено)"
fi

echo ""
echo "🔄 Заміна email '@ausom.ua' → '@ausom.in.ua'..."
# Обережно: '@ausom.ua' — тільки коли це email, не import path
FILES_EMAIL=$(grep -rln "@ausom\.ua" app components lib 2>/dev/null || true)
if [ -n "$FILES_EMAIL" ]; then
  echo "$FILES_EMAIL" | while read -r file; do
    sed -i 's/@ausom\.ua/@ausom.in.ua/g' "$file"
    echo "   ✓ $file"
  done
else
  echo "   (нічого не знайдено)"
fi

echo ""
echo "✅ Готово!"
echo ""
echo "📋 Що далі:"
echo "   1. Перевір зміни:  git diff"
echo "   2. Якщо щось не те: rm -rf app components lib && cp -r .backup-domain-migration/* ."
echo "   3. Commit + push:   git add -A && git commit -m 'migrate to ausom.in.ua domain' && git push"
echo ""
echo "🌐 Також перевір що в Vercel:"
echo "   - Settings → Domains → додано ausom.in.ua + www.ausom.in.ua"
echo "   - Settings → Environment Variables → NEXT_PUBLIC_SITE_URL=https://ausom.in.ua"
echo ""
