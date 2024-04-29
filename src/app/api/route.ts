import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

export const revalidate = 60

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
  const { data, success } = await fetchDogData(body.success)
  if (!success || !body.success) redirect('/')
  return Response.json({ data })
}
