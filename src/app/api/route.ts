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
  const cookieStore = cookies()
  const user = cookieStore.get('user')
  const headerList = headers()
  const referer = headerList.get('referer')
  const headersFromRequest = new Headers(request.headers)
  const query = request.nextUrl.searchParams.get(`query`)
  return Response.json({ data })
}

export async function POST(request: NextRequest) {
  const body: { success: boolean } = await request.json()
  const formData = await request.formData()
  const { data, success } = await fetchDogData(body.success)
  const name = formData.get('name')
  const email = formData.get('email')
  console.log('name = ' + name, 'email = ' + email)
  if (!success || !body.success) redirect('/')
  return Response.json({ data })
}
