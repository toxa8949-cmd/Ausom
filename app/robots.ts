import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ausom.in.ua'

export default function robots(): MetadataRoute.Robots {
    return {
          rules: [
            {
                      userAgent: '*',
                      allow: '/',
                      disallow: [
                                  '/admin/',     // admin panel — not for search engines
                                  '/api/',       // API routes
                                  '/checkout/',  // checkout flow — don't index
                                  '/cart/',      // cart — personal, don't index
                                  '/track/',     // order tracking — personal
                                  '/loyalty/',   // loyalty account — personal
                                  '/affiliate/', // affiliate account — personal
                                ],
            },
                ],
          sitemap: `${SITE_URL}/sitemap.xml`,
          host: SITE_URL,
    }
}
