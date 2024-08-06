/**
 *
 * Routing => [Route Handler]#Caching
 *
 *
 * 1. GET 메서드를 Response 오브젝트와 함께 사용할 때 라우트 핸들러가 캐시되고, 다음 요청 시 캐시된 데이터를 응답한다.
 *
 * 2. 핸들러의 캐시가 옵트아웃되는 조건은 아래와 같다. optout API 라우트에서 예제 설명.
 *
 *    1. Request 오브젝트를 사용하는 경우
 *
 *    2. GET이 아닌 HTTP 메서드를 사용하는 경우
 *
 *    3. Dynamic Function을 사용하는 경우
 *
 *    4. Segment Config Options에 'force-dynamic'과 같은 옵션을 사용해서 라우트를 동적으로 변경한 경우
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/route-handlers#caching
 *
 * */
export function GET() {
  console.log('라우트 핸들러 캐싱이 작동하면 이 로그는 출력되지 않아야 한다.')
  return Response.json({ time: new Date().getTime() })
}
