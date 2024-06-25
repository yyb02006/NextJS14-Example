export function GET() {
  console.log('request-memoization GET 메서드 캐싱 API')
  return Response.json({ time: new Date().getTime() })
}

export function POST() {
  console.log('request-memoization POST 메서드 캐싱 API')
  return Response.json({ time: new Date().getTime() })
}
