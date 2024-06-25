/**
 *
 * Routing => [Route Handler]#Dynamic Route Segments
 *
 *
 * 1. 일반 라우트에서 다이나믹 라우트를 사용하는 것처럼 같은 방식으로 라우트 핸들러도 동적으로 경로를 지정할 수 있다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments
 *
 */
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug
  console.log(slug)
  return Response.json({ slug })
}
