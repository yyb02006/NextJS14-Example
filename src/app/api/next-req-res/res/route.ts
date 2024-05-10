import { type NextRequest, NextResponse } from 'next/server'

/**
 *
 * Functions => [NextResponse]
 *
 *
 * 1. NextRequest처럼 Response 객체를 확장한 NextResponse또한 존재하는데, NextResponse는 전체적으로 라우트 핸들러보다는 미들웨어에서 유용하게 쓰인다.
 *
 * 2. cookies 프로퍼티를 지원하지만 NextRespones의 cookies 프로퍼티에 접근하기 위해서는 next 메서드가 반환하는 Response객체를 사용해야 하는데,
 *    next는 미들웨어 체인을 진행시키는 메서드로 라우트 핸들러에서 사용할 수 없기 때문에 cookies 프로퍼티 또한 라우트 핸들러에서 사용할 수 없다.
 *
 *
 * ref : https://nextjs.org/docs/app/api-reference/functions/next-response
 *
 */
export function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get('target')
  switch (target) {
    case 'redirect':
      /**
       * Functions => [NextResponse]#redirect()
       *
       * redirect 메서드를 사용하면 파라미터로 주어진 URL로 303 HTTP 리다이렉트 응답을 반환한다.
       * */
      return NextResponse.redirect('http://localhost:3000/dashboard')
    case 'rewrite':
      /**
       * Functions => [NextResponse]#rewrite()
       *
       * rewrite 메서드를 사용하면 원래의 URL을 유지한 채로 파라미터로 주어진 URL의 페이지를 렌더링하는 *프록시 동작을 응답으로 반환한다.
       *
       * *직접 서버에 접속하지 않고도 서버를 이용할 수 있게 해주는 시스템.
       *  여기서는 직접 URL에 접속하지 않고 URL의 페이지에 접근할 수 있기 때문에 프록시 동작이라고 칭함.
       * */
      return NextResponse.rewrite('http://localhost:3000/dashboard')
    default:
      /**
       * Functions => [NextResponse]#json()
       *
       * 기본적인 json body 응답이며, 타입스크립트 5.2버전 이후부터는 Response.json으로 가능하다.
       * */
      return NextResponse.json({ success: true, data: 'default json response' })
  }
}
