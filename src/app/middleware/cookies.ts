import { NextResponse } from 'next/server'

export default function cookies() {
  const response = NextResponse.next()
  const cookiePayloads = [
    { key: 'middleware-payload', value: 'cat' },
    { key: 'middleware-payload', value: 'dog' },
    { key: 'middleware-dessert', value: 'cookie' },
    { key: 'middleware-dessert', value: 'cake' },
  ]
  cookiePayloads.forEach(({ key, value }) => {
    response.cookies.set(key, value)
  })
  response.cookies.set({ name: 'middleware-cookie', value: 'candy', path: '/' })
  console.log('get = ', response.cookies.get('middleware-cookie'))
  console.log('getAll = ', response.cookies.getAll())
  response.cookies.delete('middleware-payload')
  console.log('getAll = ', response.cookies.getAll())
  console.log(response.cookies.has('middleware-dessert'))
  return response
}
