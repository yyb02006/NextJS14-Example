import { NextRequest, NextResponse } from 'next/server'

/**
 * 허용하는 Origins
 */
const allowedOrigins = ['https://domain1.com', 'https://domain2.org']

/**
 * CORS 옵션
 */
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

/**
 *
 * Routing => [Middleware]#CORS
 *
 *
 * 1. 라우터 핸들러와 마찬가지로 미들웨어에서도 응답해더에 CORS 옵션을 삽입할 수 있다.
 *
 * 2. 유용한 사용예로 Preflight를 처리할 경우에 사용할 수 있는데, request.method 프로퍼티로 OPTIONS메서드 요청을 구분한 다음
 *    NextResponse.json에 빈 객체와 담아야 하는 headers를 삽입해서 핸들러로 보내지 않고 바로 응답하는 방법이다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/middleware#cors
 *
 */
export default function middlewareCors(request: NextRequest) {
  // requeset.headers.get을 통해 반환한 origin 값이 허용된 오리진 배열에 존재하는지 확인
  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)

  // 현재 요청이 preflight 요청인지 확인
  const isPreflight = request.method === 'OPTIONS'

  // preflight인 경우 알맞은 헤더를 넣어서 반환
  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  // next 메서드를 사용하여 api 체인으로 전달할 응답객체 할당
  const response = NextResponse.next()

  // origin이 오리진 배열에 존재할 경우 'Access-Control-Allow-Origin'헤더에 현재 오리진을 할당
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  // 다른 CORS 옵션도 헤더에 할당
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // 응답객체 반환
  return response
}
