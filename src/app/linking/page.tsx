'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/**
 *
 * Routing => [Linking and Navigating]#<Link> Component
 *
 *
 * 1. App Router의 페이지 이동시 기본 동작은 스크롤을 최상단으로 올리고, 앞으로가기 또는 뒤로가기가 실행되면 스크롤을 유지하는 것이다.
 *
 * 2. <Link>컴포넌트의 기본은 옛날과 그리 다르지 않다. href를 필수로 받고, replace, scroll, prefecth옵션이 있다.
 *
 * 3. HTML표준에 hash link라는 녀석이 있는데, URL뒤에 #id를 입력하면 페이지 이동시 해당 id를 가진 요소로 스크롤된다.
 *    <Link>컴포넌트가 <a>요소로 렌더링되기 때문에 가능한 동작이고, 이 기능은 nextjs의 공식문서에서도 많이 사용되고 있다.
 *    hash link에 해당하는 id를 가진 요소가 없다면 nextjs는 page로 스크롤시킨다.
 *
 * 4. usePathname 훅을 사용할 수 있다. 예전에 useRouter에서 가져오던 pathname만 따로 가져올 수 있게 되었다.
 *
 * 5. useSearchParams 훅을 사용할 수 있다. 예전에 useRouter에서 가져오던 query만 따로 가져올 수 있게 되었다.
 *
 * 6. useRouter 훅을 사용할 수 있다. 페이지 이동을 프로그래밍 방식으로 가능하게 한다. 종종 필요하다.
 *    *기존의 useRouter는 next/router에 있고, 새로운 useRouter는 next/navigation에 있으니 import시 주의하자.
 *
 * 7. 서버 컴포넌트에서는 useRouter 대신 사용할 수 있는 redirect 함수가 있다. server-linking에서 설명.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#link-component
 *
 * */
export default function LinkingPage() {
  /**
   * usePatchname : 딱 pathname만 가지고 오는 훅. pathname만 필요할 때 이제 useRouter를 쓸 필요가 없다.
   *
   * ref : https://nextjs.org/docs/app/api-reference/functions/use-pathname
   * */
  const pathname = usePathname()

  /**
   * useSearchParams : web api의 URLSearchParams객체를 읽기전용으로 반환한다.
   *                   get메서드로 특정 쿼리에 대한 값을 받을 수 있고, has메서드로 특정 쿼리가 존재하는지 판단할 수 있다.
   *
   * ref(Hook) : https://nextjs.org/docs/app/api-reference/functions/use-search-params
   * ref(URLSearchParams API) : https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams
   * */
  const query = useSearchParams()

  /**
   * useRotuer : 기존의 useRouter훅. 아래의 메서드들을 가진다.
   *
   *             - push(href: string, { scroll: boolean }) : 이동한다. 히스토리 스택에 추가된다.
   *
   *             - replace(href: string, { scroll: boolean }) : 교체한다. 히스토리 스택에서 페이지 이동을 시작한 페이지가 도착한 페이지로 교체된다.
   *
   *             - refresh() : 새로고침한다. 히스토리는 변하지 않으며 리액트 서버에서는 서버 요청, 서버 컴포넌트 렌더링부터 다시한다.
   *                         클라이언트측에서는 useState같은 리액트 상태나 스크롤 위치같은 브라우저 상태는 유지된다고 한다.
   *
   *             - prefetch(href: string) : 해당 경로의 데이터를 준비시킨다. Link컴포넌트의 prefetching을 수동으로 하는 것과 같다.
   *
   *             - back() : 뒤로가기. 상식이지만, 뒤로가기를 실행한 다음 페이지 이동 발생시 앞으로가기 히스토리는 사라진다.
   *
   *             - forward() : 앞으로가기.
   *
   * ref : https://nextjs.org/docs/app/api-reference/functions/use-router
   * ref(History API) : https://developer.mozilla.org/ko/docs/Web/API/History_API
   */
  const router = useRouter()
  console.log(query.get('a'))
  return (
    <ul>
      <li>Hello Linking Page!</li>
      <li>
        Pathname: <span className="text-cyan-400">{pathname}</span>
      </li>
      <li>
        <button
          type="button"
          onClick={() => {
            router.push('/', { scroll: false })
          }}
          className="bg-green-600"
        >
          &nbsp; Navigate to The Home with UseRouter &nbsp;
        </button>
      </li>
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
