import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

/**
 *
 * Routing => [Route Handlers]#Route Segment Config
 *
 *
 * 1. 지정된 이름의 세그먼트 옵션 변수를 내보내는 방법으로 Config를 조정할 수 있으며, 아래의 옵션들이 존재한다.
 *
 *
 * ref : https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 *
 * */

/**
 * 캐시된 데이터의 재검증 시간. fetch api를 사용할 때 같은 요청에 대해 캐시된 데이터를 revaildate 시간만큼 사용한다.
 * revaildate 옵션을 사용하더라도 여전히 개별 fetch 요청의 cache 옵션을 우선해서 사용할 수 있다.
 *
 * - false(default) : dynamic function이 사용되기 전에 실행된 모든 fetch 요청에 대해 무기한으로 캐시한다.
 *
 * - 0 : 캐시하지 않는다. fetch 요청에 cache 옵션이 설정되어 있지 않다면 'no-store'가 적용된다.
 *
 * - number : 재검증될 주기를 초단위로 설정한다.
 * */
export const revalidate = false

/**
 * 해당 세그먼트를 동적으로 사용할 것인지, 정적으로 사용할 것인지에 대한 옵션.
 *
 * - 'auto'(default) : 세그먼트를 최대한 정적으로 사용하지만, dynamic function이 사용될 때와 같이 세그먼트를 동적으로 사용해야 하는 상황에서는 동적으로 작동한다.
 *
 * - 'force-dynamic' : 세그먼트를 동적으로 사용한다. 라우트 핸들러에서는 데이터의 캐싱을 하지 않는 것과 같다.
 *
 * - 'force-static' : 세그먼트를 정적으로 사용한다. dynamic function은 empty value를 반환한다.
 *
 * - 'error' : 세그먼트를 정적으로 사용하며 동적 세그먼트가 필요한 dynamic function과 같은 요소가 사용될 때는 error를 발생시킨다.
 * */
export const dynamic = 'auto'

/**
 * generateStaticParams로 미리 생성되지 않은 dynamic segment에 접근했을 때, 어떻게 할 것인지에 대한 옵션.
 *
 * - true(default) : 미리 생성되지 않은 dynamic segment에 접근할 때 해당 세그먼트를 생성한다.
 *
 * - false : 미리 생성되지 않은 dynamic segment에 접근할 때 404 페이지를 반환한다.
 * */
export const dynamicParams = true

/**
 * nextjs는 fetch 요청의 cache 옵션에 대해 기본적으로 dynamic function 이전의 fetch요청은 캐시하고 dynamic function 이후의 fetch 요청은 캐시하지 않는다.
 *
 * - 'auto'(default) : 위와 같은 기본 동작으로 캐시하도록 설정한다.
 *
 * - 'default-cache' : fetch 요청에 cache 옵션을 전달하는 것을 허용하고, 전달하지 않은 경우에는 'force-cache'옵션을 적용한다.
 *                     이 경우 dynamic function 이후의 fetch 요청에 대해서도 캐시된다.
 *
 * - 'only-cache' : fetch 요청에 cache 옵션이 없다면 기본값으로 'force-cache'를 사용하도록 하며, 'no-store'를 사용하는 요청에 대해 에러를 발생시킨다.
 *
 * - 'force-cache' : 모든 fetch 요청이 'force-cache' 옵션을 사용하도록 강제한다.
 *
 * - 'default-no-store' : fetch 요청에 cache 옵션을 전달하는 것을 허용하고, 전달하지 않은 경우에는 'no-store'옵션을 적용한다.
 *                        이 경우 dynamic function 이전의 fetch 요청에 대해서도 캐시되지 않는다.
 *
 * - 'only-no-store' : fetch 요청에 cache 옵션이 없다면 기본값으로 'no-store'를 사용하도록 하며, 'force-cache'를 사용하는 요청에 대해 에러를 발생시킨다.
 *
 * - 'force-no-store' : 모든 fetch 요청이 'no-store' 옵션을 사용하도록 강제한다.
 * */
export const fetchCache = 'auto'

/**
 * runtime 옵션으로 서버사이드의 어떤 런타임 환경에서 작동될 것인지에 대해 설정할 수 있다.
 *
 * - 'nodejs'(default) : NextJs14의 서버사이드는 기본적으로 nodejs 환경을 사용한다.
 *
 * - 'edge' : 미들웨어같은 파일에서 사용할 수 있는 빠른 속도의 런타임이다.
 */
export const runtime = 'nodejs'

/**
 * 선호하는 지역을 설정할 수 있다. 지역을 설정하면 사용자에게 가장 가까운 서버가 작동하는데, 이 개념은 Vercel에서 사용되는 것 같다.
 * 'auto'(default), 'global', 'home', ['ladi', 'sf01']와 같은 값을 사용할 수 있다고 한다.
 */
export const preferredRegion = 'auto'

const fetchDogData = (success: boolean = true) => {
  return new Promise<{ success: boolean; data: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        success,
        data: 'The dog is a domesticated descendant of the wolf.',
      })
    }, 3000)
  })
}

/**
 *
 * Routing => [Route Handlers]
 *
 *
 * 1. 앱라우터에서 라우트 핸들러는 api폴더 아래에 route.ts 파일을 만들어서 사용할 수 있다.
 *
 * 2. 각 HTTP 메서드에 대응하는 핸들러를 만들기 위해 GET, POST, PUT, PATCH, DELETE, HEAD, OPTION 함수를 정의해야한다.
 *    대응하는 메서드를 이름으로 가진 함수가 없다면 405 Method Not ALlowed 응답을 리턴하게 된다.
 *
 * 3. 라우트 핸들러에서는 기존 request, response API를 확장한 NextRequest, NextRespones를 사용한다.
 *    api/next-req-res API 라우트에서 구체적으로 설명.
 *
 * 4. GET을 사용할 때는 기본적으로 캐싱을 사용한다.
 *    다른 HTTP 메서드를 사용하거나, 핸들러 내에서 Request 오브젝트를 사용하거나, cookies, headers와 같은 Dynamic Functions를 사용하는 경우 캐싱이 중지된다.
 *    Segment Config Options의 dynamic 옵션을 사용해도 캐싱은 중지된다.
 *    api/caching API 라우트에서 구체적으로 설명.
 *
 *
 * ref : https://nextjs.org/docs/app/api-reference/functions/next-request
 *
 * */
export async function GET(request: NextRequest) {
  /* 
  fetch 함수에 아래처럼 next revalidation 옵션 추가 가능

  const respones = await (
    await fetch(
      'https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1',
      { next: { revalidate: 60 } },
    )
  ).json()
  */
  const { data, success } = await fetchDogData()
  /**
   * Routing => [Route Handlers]#Cookies
   *
   * 1. Cookies DynamicFunction으로부터 cookieStore를 생성하거나 NextRequest 오브젝트를 사용하여 Set-Cookie header에 접근 가능
   *
   * 2. 위 두 가지 방법 모두에 동일한 기능의 메서드가 포함되어 있으며 자세한 메서드들에 대해서는 next-req-res API 라우트에서 설명
   *
   * ref : https://nextjs.org/docs/app/building-your-application/routing/route-handlers#cookies
   * */
  const cookieStore = cookies()
  /**
   * - set(name, value, options?) : name과 value 파라미터에 값을 전달하여 쿠키를 할당할 수 있음
   *
   * - options? parameter : 옵션으로 전달할 수 있는 cookie? 파라미터는 Domain, HttpOnly, Max-Age와 같이
   *                        쿠키에 적용할 현재 사양의 Set-Cookie 헤더의 Attributes를 전달할 수 있음
   *
   * ref(Attributes) : https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#attributes
   * */
  cookieStore.set('user', 'john', { maxAge: 60, httpOnly: true, secure: true })
  /**
   * - get(name) : name과 일치하는 쿠키의 값을 불러옴
   */
  const user = cookieStore.get('user')
  console.log(`get user cookie = ${user}`)
  /**
   * Routing => [Route Handlers]#Headers
   *
   * 1. Headers DynamicFunction으로부터 headerList를 생성하거나 NextRequest 오브젝트의 headers프로퍼티를 사용하여 header에 접근 가능
   *
   * 2. 위 두 가지 방법 모두에 동일한 기능의 메서드가 포함되어 있으며 NextRequest를 이용하는 방법에 대해서는 next-req-res API 라우트에서 설명
   *
   * 3. header 인스턴스는 기본적으로 읽기전용이며 header를 설정하기 위해서는 응답에서 Responese 인스턴스를 생성하여 headers 프로퍼티를 통해 설정해야함
   *
   * ref : https://nextjs.org/docs/app/building-your-application/routing/route-handlers#headers
   * */
  const headerList = headers()
  const referer = headerList.get('referer') || ''
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { referer },
  })
}

export async function POST(request: NextRequest) {
  /**
   * Routing => [Route Handlers]#Request Body
   *
   * 1. request body를 읽는 방법은 이전처럼 request.json() web api 메서드를 통해 파싱하면 된다.
   * */
  const body: { success: boolean } = await request.json()
  /**
   * Routing => [Route Handlers]#Request Body FormData
   *
   * 1. formData를 수신한 경우 request.fromData() 메서드를 통해 읽을 수 있으며, 여기서 formData는 전부 문자열로 표현되기 때문에
   *    데이터를 포맷팅하기 위한 별도의 처리가 필요하다.
   * */
  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')
  console.log('name = ' + name, 'email = ' + email)
  /**
   * Routing => [Route Handlers]#Redirects
   *
   * 1. 서버 컴포넌트에서 사용하는 redirects 함수를 라우트 핸들러에서도 사용할 수 있다.
   * */
  const { data, success } = await fetchDogData(body.success)
  if (!success || !body.success) redirect('/')
  return Response.json({ data })
}
