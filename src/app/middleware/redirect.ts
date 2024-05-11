import { NextResponse } from 'next/server'

/**
 *
 * Routing => [Redirecting]#nextresponseredirect-in-middleware
 *
 *
 * 1. 미들웨어에서의 리디렉션 처리
 *
 *    - 미들웨어가 작동될 경로 범위는 config에서 처리할 수 있다. 단순히 리디렉션의 기능으로만 쓸 거라면, 경로 처리를 이쪽으로 해도 괜찮다.
 *
 *    - NextRespense의 메서드인 redirect로 리디렉션이 가능하다.
 *
 *    - next.config.mjs의 리디렉션이 최우선 순위이며 미들웨어 리디렉션도 우선 순위가 높은 편이다.
 *
 *    ref : https://nextjs.org/docs/app/building-your-application/routing/redirecting#nextresponseredirect-in-middleware
 *
 *
 * 2. 굉장히 많은 수의 리디렉션 규칙을 운영해야 하는 경우
 *
 *    - 예를 들어, 대형 공식문서를 리뉴얼 했거나, 쇼핑몰 페이지의 문제가 있는 상품 페이지 몇 천개를 같은 상품을 파는 다른 페이지로 리디렉션 해야한다고 가정하자.
 *
 *      - 공식문서의 1000개 정도의 경로를 바뀐 경로로 리디렉션 해야 한다.
 *
 *      - 몇 천개의 상품을 규칙성 없는 별개의 상품 페이지로 리디렉션 해야한다.
 *
 *      위와 같은 경우 리디렉션 규칙이나 리디렉션에 필요한 데이터를 참조하면서 너무 오랜 시간이 걸릴 수 있다.
 *      공부하는 입장에서 여기까지 생각할 필요가 있나 싶지만, 이런 상황에 대한 공식문서의 참고사항을 적어둔다.
 *
 *      1. Edge Config 사용
 *
 *         - Vercel에서 제공하는 Edge Config는 CDN의 엣지 서버에 설정 정보를 분산 저장하여 사용자에게 더 가까운 위치에서 응답을 처리한다.
 *           Edge라는 이름이 붙은 기술들이 하는 것과 비슷한 일을 하는 고속 데이터베이스를 제공하는 Vercel의 유-료 서비스이다.
 *
 *           ref : https://vercel.com/docs/storage/edge-config
 *
 *      2. Bloom filter 사용.
 *
 *         - 어떤 값이 테이블 안에 절대로 존재하지 않는지, 존재할 가능성이 있는지를 확인할 수 있는 확률적 자료구조이다.
 *           굉장히 간단한 자료구조이기 때문에 빠르게 처리할 수 있다. 구글 크롬이 악성 URL를 확인할 때 블룸필터를 사용한다.
 *
 *           ref(Wikipedia) : https://ko.wikipedia.org/wiki/%EB%B8%94%EB%A3%B8_%ED%95%84%ED%84%B0
 *           ref(Example) : https://redirects-bloom-filter.vercel.app
 *
 *    ref : https://nextjs.org/docs/app/building-your-application/routing/redirecting#managing-redirects-at-scale-advanced
 *
 *
 * ref: https://nextjs.org/docs/app/building-your-application/routing/redirecting
 *
 * */
export function RevertToFrom(requestedUrl: string) {
  const response = NextResponse.redirect('http://localhost:3000')
  response.cookies.set('requested-url', requestedUrl)
  return response
}
