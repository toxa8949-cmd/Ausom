import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Redirect www.ausom.in.ua → ausom.in.ua (301 permanent)
// This runs at the Edge before any page render, ensuring Google
// sees the canonical non-www domain on every request.
export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''

    if (host.startsWith('www.')) {
        const nonWwwHost = host.slice(4)
            const url = request.nextUrl.clone()
                url.host = nonWwwHost
                    return NextResponse.redirect(url, { status: 301 })
                      }

                        return NextResponse.next()
                        }

                        export const config = {
                          matcher: '/:path*',
                          }
