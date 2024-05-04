import { NextRequest } from 'next/server'

export default function GET(request: NextRequest) {
  const cookiePayloads = [
    { key: 'payload', value: 'cat' },
    { key: 'payload', value: 'dog' },
    { key: 'dessert', value: 'cookie' },
    { key: 'dessert', value: 'cake' },
  ]
  cookiePayloads.forEach(({ key, value }) => {
    request.cookies.set(key, value)
  })
  const requestCookies = request.cookies.set('dessert', 'candy')
  console.log(requestCookies)
  request.cookies.get('payload')
  const [payloadCookies, AllCookies] = [request.cookies.getAll('payload'), request.cookies.getAll()]
  console.log(payloadCookies, AllCookies)
  request.cookies.delete('payload')
  console.log(request.cookies.getAll())
  console.log(['payload', 'dessert'].map((el) => request.cookies.has(el)))
  request.cookies.clear()
  console.log(request.cookies.getAll())

  return Response.json({ success: true, message: 'GET Request Succeed' })
}
