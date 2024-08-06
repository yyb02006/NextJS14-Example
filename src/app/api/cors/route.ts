export const dynamic = 'force-dynamic'

/**
 *
 * Routing => [Route Handler]#Caching
 *
 *
 * 1. 각각의 라우트 핸들러에서 응답 헤더에 CORS 옵션을 사용할 수 있다. headers 옵션을 사용하기 위해선 Response의 인스턴스를 새로 생성해야한다.
 *
 * 2. 기본적으로 같은 애플리케이션 내에서 라우트핸들러를 호출할 때는 설정과 상관없이 CORS 에러가 발생하지 않는다.
 *
 * 3. Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Credentials 등의 CORS 옵션을 사용 가능
 *
 * 4. middleware와 next.config 파일에서 전체적인 CORS 옵션도 설정 가능하다.
 *
 *
 * ref(mdn CORS) : https://developer.mozilla.org/ko/docs/Web/HTTP/CORS#http_응답_헤더
 * ref : https://nextjs.org/docs/app/building-your-application/routing/route-handlers#cors
 *
 */
export async function GET() {
  return new Response('Respones with cors option', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://example.com',
      'Access-Control-Allow-Methods': 'POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
