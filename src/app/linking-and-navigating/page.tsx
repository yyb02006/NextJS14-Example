'use client'

import Link from 'next/link'

/**
 *
 * Routing => [Linking and Navigating]#<Link> Component
 *
 *
 * 1. 앱 라우터에서 링크, 네비게이션을 구현하거나, 훅, 컴포넌트 사용 시 알아둘 기능들
 *
 *    - App Router의 페이지 이동시 기본 동작은 스크롤을 최상단으로 올리고, 앞으로가기 또는 뒤로가기가 실행되면 스크롤을 유지하는 것이다.
 *
 *    - <Link>컴포넌트의 기본은 옛날과 그리 다르지 않다. href를 필수로 받고, replace, scroll, prefecth옵션이 있다.
 *
 *    - HTML표준에 hash link라는 녀석이 있는데, URL뒤에 #id를 입력하면 페이지 이동시 해당 id를 가진 요소로 스크롤된다.
 *      <Link>컴포넌트가 <a>요소로 렌더링되기 때문에 가능한 동작이고, 이 기능은 nextjs의 공식문서에서도 많이 사용되고 있다.
 *      hash link에 해당하는 id를 가진 요소가 없다면 nextjs는 page로 스크롤시킨다.
 *
 *    - usePathname 훅을 사용할 수 있다. 예전에 useRouter에서 가져오던 pathname만 따로 가져올 수 있게 되었다.
 *      use-router에서 설명.
 *
 *    - useSearchParams 훅을 사용할 수 있다. 예전에 useRouter에서 가져오던 query만 따로 가져올 수 있게 되었다.
 *      use-router에서 설명.
 *
 *    - useRouter 훅을 사용할 수 있다. 페이지 이동을 프로그래밍 방식으로 가능하게 한다. 자주 쓰일 예정이다.
 *      *기존의 useRouter는 next/router에 있고, 새로운 useRouter는 next/navigation에 있으니 import시 주의하자.
 *      use-router에서 설명.
 *
 *    - 서버 컴포넌트에서는 useRouter 훅 대신 사용할 수 있는 redirect 함수가 있다.
 *      redirect에서 설명.
 *
 *
 * 2. 앱 라우터에서 라우팅의 작동원리
 *
 *    - Code Splitting : 애플리케이션 코드는 세그먼트별로 코드 분할되어서 각 요청에 대해 제공된다.
 *                       특히 서버 컴포넌트는 서버에서 렌더링되어 HTML을 생성하고, 브라우저는 이 HTML을 빠르게 렌더링하고 클라이언트 동작을 처리하여 최적화된다.
 *
 *    - Prefetching : 프리페칭은 <Link> 컴포넌트나 useRouter 훅이 반환하는 객체의 prefetch 메서드를 이용하여 처리된다.
 *                    <Link> 컴포넌트 사용 시 prefetch 프로퍼티가 true라면 컴포넌트가 뷰포트에 들어갈 때 프리페칭되고, prefetch 메서드를 실행해도 같은 일이 일어난다.
 *                    정적 라우트에서는 프리페치와 캐시가 완전히 이루어진다.
 *                    동적 라우트에서는 컴포넌트 트리에서 첫번째 loading 스페셜 파일까지만 이루어지는데, 캐시같은 경우 30초 동안만 유지된다.
 *
 *    - Caching : Nextjs에는 Router Cache라고 불리는 인-메모리 클라이언트측 캐시가 있다.
 *                사용자가 앱을 탐색할 때, prefetch된 세그먼트와 서버컴포넌트 페이로드가 이 Router Cache에 저장된다.
 *                navigation에서는 서버에 데이터를 요청하기 이전에 캐시를 먼저 살핀다.
 *
 *                ref : https://nextjs.org/docs/app/building-your-application/caching#router-cache
 *
 *    - Partial Rendering : Nextjs에 부분 렌더링이 있는데, 이 것은 헤더, 네비게이션 바, 푸터 등 공통 요소는 상위 세그먼트에서 처리하고
 *                          컨텐츠를 그리는 하위 세그먼트가 경로에 따라서 렌더링되는 것을 말한다. 일부는 정적, 일부는 동적 렌더링.
 *                          페이지 라우터에서 이런 라우팅 처리를 하는 건 못 봤는데, 신기술인가보다.
 *
 *                          ref : https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#4-partial-rendering
 *
 *    - Soft Navigation : 위와 같은 맥락에서 나오는 개념인데, 페이지 이동 시 공유하고 있는 상위 레이아웃은 변하지 않고
 *                        변경된 세그먼트에 해당하는 부분만 렌더링해서 변경된 세그먼트를 제외하고는 상태를 유지할 수 있다.
 *                        Partial Rendering, Soft Navigation, Parallel Routes를 관련지어서 살펴보자.
 *
 *                        ref(Parallel Routes) : https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
 *
 *    - Back and Forward Navigation : 앞, 뒤 히스토리 이동시 nextjs에서는 Router Cache에서 먼저 데이터를 꺼내온다.
 *
 *    - Routing between pages/ and app/ : 페이지 라우터를 앱 라우터로 점진적 마이그레이션 할 때, 페이지 라우트와 앱 라우트가 동시에 존재할 수 있는데
 *                                        이때 nextjs가 이동을 자연스럽게 관리해줄 수 있지만, 가끔 문제가 생길 수 있다는 듯 하다. 자세한 건 공식문서 참고.
 *
 *                                        ref : https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#7-routing-between-pages-and-app
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#link-component
 *
 * */
export default function LinkingPage() {
  return (
    <ul>
      <li>Hello Linking Page!</li>
      <li>
        Click this Link! {'=> '}
        {/**
         *
         * Components => [<Link>]#Props
         *
         *
         * <Link> 컴포넌트가 가지는 props는 아래와 같다
         *
         * - href(Required) : stirng과 object를 받는다. 기존 href와 같다. href="/경로"와 같이 사용하면 된다.
         *                    object를 넣을 때는 아래와 같은 구성을 따른다.
         *
         *                    href={{ pathname: '/about', query: { name: 'test' } }}
         *
         * - replace : boolean을 받는다. 기본값은 true이며, 브라우저 세션 히스토리에 현재 세션 기록 항목(state)을 새 상태로 대체한다.
         *             즉, home => dashboard =>(replace) linking 순으로 이동했다면 뒤로가기를 눌렀을 때 home으로 이동한다.
         *
         *             참고 : https://developer.mozilla.org/ko/docs/Web/API/History_API
         *
         * - scroll : boolean을 받는다. 기본값은 true이며 값에 따른 동작은 아래와 같다.
         *
         *            true : 페이지 이동 시 스크롤을 최상단으로 올린다.
         *            false : 페이지 이동 시 스크롤을 유지한다.
         *
         * - prefetch : boolean또는 null을 받는다. 기본값은 null이며, <Link>컴포넌트가 어떤 식으로든(스크롤, 로드) 유저의 뷰포트에 나타나면,
         *              해당 페이지로의 이동에 필요한 데이터들을 백그라운드에서 미리 로드한다. 기본값인 null의 경우에는 아래와 같이 작동한다.
         *
         *              static routes : 페이지 이동에 필요한 데이터를 풀 로드한다.
         *              dynamic routes : 내부데이터가 뭐가 될지 모르기 때문에, 실제 컨텐츠가 있는 page를 감싸는 스페셜 파일인 loading파일까지만 로드한다.
         *
         *
         * ref : https://nextjs.org/docs/app/api-reference/components/link#prefetch
         *
         * */}
        <button type="button" className="bg-amber-600 hover:bg-pink-600">
          <Link href={'/dashboard'}>&nbsp; to Dashboard with Scroll to the Top &nbsp;</Link>
        </button>
      </li>
      <li className="flex h-screen w-full items-center justify-center bg-slate-400 text-6xl font-bold">
        I Wanna Scroll!
      </li>
      <li>
        <button type="button" className="block bg-amber-600 hover:bg-pink-600">
          <Link href={'/dashboard'} scroll={false}>
            &nbsp; to Dashboard with Maintain the Scroll Position &nbsp;
          </Link>
        </button>
      </li>
    </ul>
  )
}
