import { NextResponse } from 'next/server'

export default function cookies() {
  const response = NextResponse.next()
  const cookiePayloads = [
    { name: 'middleware-payload', value: 'cat' },
    { name: 'middleware-payload', value: 'dog' },
    { name: 'middleware-dessert', value: 'cookie' },
    { name: 'middleware-dessert', value: 'cake' },
  ]
  cookiePayloads.forEach(({ name, value }) => {
    response.cookies.set(name, value)
  })
  response.cookies.set({ name: 'middleware-cookie', value: 'candy', path: '/' })
  console.log('get = ', response.cookies.get('middleware-cookie'))
  console.log('getAll = ', response.cookies.getAll())
  response.cookies.delete('middleware-payload')
  console.log('getAll = ', response.cookies.getAll())
  console.log(response.cookies.has('middleware-dessert'))
  return response
}
