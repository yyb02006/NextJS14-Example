import { type NextRequest } from 'next/server'

export function GET(request: NextRequest) {
  const cookie = request.cookies.getAll()
  console.log(cookie)
  return Response.json({ data: cookie })
}
