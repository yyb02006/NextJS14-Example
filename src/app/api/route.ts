import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

export const revalidate = 60
/* export const dynamic = 'auto'
export const dynamicParams = truncate
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto' */

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
