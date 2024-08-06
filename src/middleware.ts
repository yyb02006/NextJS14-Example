import { NextRequest, NextResponse } from 'next/server'
import { revertToFrom } from './app/middleware/redirect'
import middlewareCookies from './app/middleware/cookies'

export function middleware(request: NextRequest) {
  const {
    nextUrl: { searchParams, pathname, origin, basePath },
    referrer,
    url,
  } = request
  // console.log('request = ' + pathname, 'referrer = ' + referrer)
  const target = searchParams.get('target')
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', url)
  requestHeaders.set('x-origin', origin)
  requestHeaders.set('x-pathname', pathname)
  requestHeaders.set('x-base-path', basePath)
  switch (target) {
    case 'redirect': {
      const response = revertToFrom(pathname)
      return response
    }
    case 'response-cookies': {
      const response = middlewareCookies()
      return response
    }
    case 'request-cookies':
      request.cookies.set('request', 'cookies from middleware request')
      // console.log(request.cookies.getAll())
      return NextResponse.next()
    case 'headers':
      const headers = new Headers(request.headers)
      headers.set('middleware-header', 'hello')
      const response = NextResponse.next({ request: { headers } })
      return response
    case 'cors':
    default:
      return NextResponse.next({ request: { headers: requestHeaders } })
  }
}

export const config = {
  // 미들웨어 matcher가 :path와 같은 dynamic parameter에 대해 제대로 작동하지 않는 버그를 가지고 있음. 실제 :path를 매칭하지 못하고, :path의 부모 경로만 매칭 가능함.
  // 아래 경로의 경우 "/linking-and-navigating/redirecting/use-router" 경로만 매칭
  // matcher: '/linking-and-navigating/redirecting/use-router/:path',
  //
  // matcher가 정규식을 지원하니 경로에 정규식 사용 권장
  // https://github.com/vercel/next.js/issues/53840
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', '/api/middleware-api'],
}
