import { cookies, headers } from 'next/headers'
import { NextRequest } from 'next/server'

// dynamic 변수에 force-dynamic 값을 할당하여 라우트 핸들러를 동적으로 만들어서 캐싱 옵트아웃
export const dynamic = 'force-dynamic'

// request 오브젝트를 사용하여 라우트 핸들러 캐싱 옵트아웃
export function GET(request: NextRequest) {
  // headers, cookies와 같은 dynamic function을 사용하여 라우트 핸들러 캐싱 옵트아웃
  const cookieStore = cookies()
  const headerList = headers()
  console.log('라우트 핸들러 캐싱이 옵트아웃 되었다면 이 로그가 출력되어야 한다.')
  return Response.json({ time: new Date().getTime() })
}

// GET이 아닌 HTTP 메서드에 대해서는 라우트 핸들러 캐싱 옵트아웃
export function POST() {
  console.log('GET이 아닌 HTTP 요청은 캐싱이 옵트아웃 된다')
  return Response.json({ time: new Date().getTime() })
}
