import { MetadataRoute } from 'next'
import { fetchAllProducts, fetchAllPosts } from '@/lib/data'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ausom.in.ua'

// ════════════════════════════════════════════════════════════════
// Dynamic sitemap — includes all products and blog posts from Supabase
// ════════════════════════════════════════════════════════════════
// Google fetches /sitemap.xml; we generate it on demand from DB so adding
// a new product in admin surfaces it immediately (next crawl).
// Revalidated hourly to keep the XML fresh without spamming DB on every hit.

export const revalidate = 3600 // 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date()

  // Static routes — high priority, updated infrequently
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,       lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${SITE_URL}/catalog`, lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${SITE_URL}/blog`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${SITE_URL}/compare`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/sale`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/about`,   lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/parts`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.6 },

        // Brand landing pages — proper URL segments for SEO (NOT query params)
        // These replace /catalog?brand=ausom which Google ignores as separate pages.
    { url: `${SITE_URL}/catalog/ausom`,   lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/catalog/kukirin`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
      ]

  // Dynamic product pages — fetched from DB
  let productRoutes: MetadataRoute.Sitemap = []
      try {
            const products = await fetchAllProducts()
            productRoutes = products
              .filter(p => p.in_stock) // only index in-stock products
        .map(p => ({
                  url: `${SITE_URL}/product/${p.slug}`,
                  lastModified: p.created_at ? new Date(p.created_at) : now,
                  changeFrequency: 'weekly' as const,
                  priority: p.is_featured ? 0.9 : 0.7,
        }))
      } catch (err) {
            console.warn('[sitemap] failed to fetch products', err)
      }

  // Dynamic blog post pages
  let blogRoutes: MetadataRoute.Sitemap = []
      try {
            const posts = await fetchAllPosts()
            blogRoutes = posts.map(p => ({
                    url: `${SITE_URL}/blog/${p.slug}`,
                    lastModified: p.published_at ? new Date(p.published_at) : now,
                    changeFrequency: 'monthly' as const,
                    priority: 0.6,
            }))
      } catch (err) {
            console.warn('[sitemap] failed to fetch blog posts', err)
      }

  return [...staticRoutes, ...productRoutes, ...blogRoutes]
}
