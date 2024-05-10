import { NextRequest } from 'next/server'

/**
 *
 * Functions => [NextRequest]#ip
 *
 *
 * 1. ip 프로퍼티를 지원한다. 요청하는 ip 주소를 반환하며, Vercel 배포시에만 지원된다고 한다.
 *
 * 2. 다른 플랫폼에서는 'X-Forwarded-For' 헤더를 사용할 수 있다.
 *
 *
 * ref(X-Forwarded-For) : https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/X-Forwarded-For
 * ref : https://nextjs.org/docs/app/building-your-application/routing/route-handlers#nextUrl
 *
 */
const getIp = (request: NextRequest) => {
  const useVercel = request.ip
  const useOtherFlatform = request.headers.get('X-Forwarded-For')
  return useVercel ? useVercel : useOtherFlatform
}

/**
 *
 * Functions => [NextRequest]#nextUrl
 *
 *
 * - nextURL 프로퍼티를 지원한다. 이 프로퍼티는 URL 객체를 확장한 것이며, URL정보의 일부를 가진 아래와 같은 프로퍼티가 추가되었다.
 *
 *   1. basePath : next.config으로 추가한 basePath 접두사의 값을 반환한다. string 타입.
 *
 *   ref : https://nextjs.org/docs/app/api-reference/next-config-js/basePath
 *
 *   2. buildId : next.config으로 추가한 buildId의 값을 반환한다. string | undefined 타입.
 *
 *   ref : https://nextjs.org/docs/app/api-reference/next-config-js/generateBuildId
 *
 *   3. pathname : URL의 pathname을 반환한다. string 타입.
 *
 *   4. searchParams : URL의 query parameter를 반환한다. get과 같은 메서드를 가진 URLSearchParams object 타입.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/route-handlers#nextUrl
 *
 */
const getNextURLProps = (request: NextRequest) => {
  const { basePath, buildId, pathname, searchParams } = request.nextUrl
  console.log(
    'basePath = ',
    basePath,
    'buildId = ',
    buildId,
    'pathname = ',
    pathname,
    'searchParams = ',
    searchParams,
  )
  return { basePath, buildId, pathname, searchParams }
}

/**
 *
 * Functions => [NextRequest]#cooikes
 *
 *
 * - cookies 프로퍼티를 지원한다. 이 프로퍼티는 요청의 Set-Cookies 헤더에 접근하여 읽기, 쓰기를 수행할 수 있다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/route-handlers#cors
 *
 */
const getCookies = (request: NextRequest) => {
  /**
   * - cookies.set(name, value)
   *
   *   name을 이름으로 하고 value를 값으로 갖는 쿠키를 생성하는 메서드
   */
  const requestCookies = request.cookies.set('dessert', 'candy')
  const cookiePayloads = [
    { key: 'payload', value: 'cat' },
    { key: 'payload', value: 'dog' },
    { key: 'dessert', value: 'cookie' },
    { key: 'dessert', value: 'cake' },
  ]
  cookiePayloads.forEach(({ key, value }) => {
    request.cookies.set(key, value)
  })
  console.log('requestCookiesObject = ', requestCookies)
  /**
   * - cookies.get(name)
   *
   *   name을 이름으로 하는 쿠키를 찾는 메서드. 동일한 이름의 쿠키가 여러 개라면, 첫 번째 쿠키를 반환한다.
   */
  const payloadCookie = request.cookies.get('payload')
  console.log(payloadCookie)
  /**
   * - cookies.getAll()
   *
   *   모든 쿠키를 반환하는 메서드. 파라미터로 name을 받을 수 있으며, 그럴 경우 해당 name을 이름으로 하는 모든 쿠키를 반환한다.
   */
  const [payloadCookies, allCookies] = [request.cookies.getAll('payload'), request.cookies.getAll()]
  console.log('payloadCookies = ', payloadCookies)
  console.log('allCookies = ', allCookies)
  /**
   * - cookies.delete(name)
   *
   *   name을 이름으로 하는 쿠키를 삭제하는 메서드.동일한 이름의 쿠키가 여러 개라면, 첫 번째 쿠키를 삭제한다.
   */
  request.cookies.delete('payload')
  console.log('allCookies after deleted = ', request.cookies.getAll())
  /**
   * - cookies.has(name)
   *
   *   name을 이름으로 하는 쿠키의 존재 여부를 boolean 값으로 반환한다.
   */
  console.log(
    'has cookies after deleted = ',
    ['payload', 'dessert'].map((el) => request.cookies.has(el)),
  )
  /**
   * - cookies.clear()
   *
   *   모든 쿠키를 삭제하는 메서드.
   */
  request.cookies.clear()
  console.log('allcookies after deleted ', request.cookies.getAll())
}

/**
 *
 * Functions => [NextRequest]#geo
 *
 *
 * 1. geo 프로퍼티를 지원한다. 요청에 담긴 지리적 정보를 반환한다. Vercel 배포시에만 지원된다고 한다.
 *
 * 2. 다른 플랫폼에서는 'X-Forwarded-For' 헤더로 반환받은 ip 정보를 바탕으로 다른 지리정보 서비스를 사용하여 지리적 정보를 찾아야 한다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/route-handlers#cors
 *
 */
const getGeo = (request: NextRequest) => {
  if (!request.geo) return
  const { city, country, latitude, longitude, region } = request.geo
  console.log(city, country, latitude, longitude, region)
  return request.geo
}

/**
 *
 * Functions => [NextRequest]
 *
 *
 * - NextJS의 라우트 핸들러는 기본적으로 Request와 Response 객체를 NextRequest와 NextResponse 객체로 확장하여 사용한다.
 *   타입스크립트에서는 이를 위해 NextRequest, NextResponse 타입과 객체를 따로 지원하기도 하지만,
 *   타입스크립트 5.2 이상의 버전에서는 응답에서 Response.json()를 NextResponse.json()대신 사용할 수 있다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/route-handlers#cors
 *
 */
export function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get('target') as
    | 'cookies'
    | 'nextURL'
    | 'ip'
    | 'geo'
    | null
  let data = null
  switch (target) {
    case 'cookies':
      data = getCookies(request)
      break
    case 'nextURL':
      data = getNextURLProps(request)
      break
    case 'ip':
      data = getIp(request)
    case 'geo':
      data = getGeo(request)
    default:
      console.log('no matched target or empty target')
      break
  }
  return Response.json({ success: true, message: 'GET Request Succeed', data })
}
