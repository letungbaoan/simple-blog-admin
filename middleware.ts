// middleware.ts
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

const publicPaths = [
  '/', // Trang chủ (nơi bạn redirect đến Login)
  '/auth/login',
  '/auth/register'
]

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    if (token && publicPaths.some((path) => pathname.endsWith(path))) {
      const url = new URL(req.nextUrl.origin)

      url.pathname = '/dashboard/posts'

      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        if (publicPaths.some((path) => pathname.endsWith(path))) {
          return true
        }

        return !!token
      }
    }
  }
)

export const config = {
  matcher: ['/:path*']
}
