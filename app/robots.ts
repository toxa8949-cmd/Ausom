import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ausom.in.ua'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/checkout/',
          '/cart/',
          '/track/',
          '/loyalty/',
          '/affiliate/',
        ],
      },
    ],
    sitemap: SITE_URL + '/sitemap.xml',
  }
}
