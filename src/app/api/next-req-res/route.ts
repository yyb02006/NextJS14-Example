import { NextRequest } from 'next/server'

const getIp = (request: NextRequest) => {
  const useVercel = request.ip
  const useOtherFlatform = request.headers.get('X-Forwarded-For')
  return useVercel ? useVercel : useOtherFlatform
}

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

const getCookies = (request: NextRequest) => {
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
  console.log('requestCookiesObject = ', requestCookies)
  request.cookies.get('payload')
  const [payloadCookies, allCookies] = [request.cookies.getAll('payload'), request.cookies.getAll()]
  console.log('payloadCookies = ', payloadCookies, allCookies)
  console.log('allCookies = ', allCookies)
  request.cookies.delete('payload')
  console.log('allCookies after deleted = ', request.cookies.getAll())
  console.log(
    'has cookies after deleted = ',
    ['payload', 'dessert'].map((el) => request.cookies.has(el)),
  )
  request.cookies.clear()
  console.log('allcookies after deleted ', request.cookies.getAll())
}

const getGeo = (request: NextRequest) => {
  if (!request.geo) return
  const { city, country, latitude, longitude, region } = request.geo
  console.log(city, country, latitude, longitude, region)
  return request.geo
}

export default function GET(request: NextRequest) {
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
      getNextURLProps(request)
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
