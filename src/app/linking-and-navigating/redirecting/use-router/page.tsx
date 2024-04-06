'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

type LinkButtonColor =
  | 'bg-green-600'
  | 'bg-amber-600'
  | 'bg-sky-600'
  | 'bg-indigo-600'
  | 'bg-red-600'
  | 'bg-teal-600'

const LinkButton = ({
  method,
  text,
  color,
}: {
  method: () => void
  text: string
  color: LinkButtonColor
}) => {
  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => {
          method()
        }}
        className={`${color} px-2 py-1`}
      >
        {text}
      </button>
    </div>
  )
}

/**
 *
 * Functions => [useRouter]
 * Routing => [Redirecting]#userouter() hook
 *
 *
 * 1. 기존의 useRouter는 next/router에 있고, 새로운 useRouter는 next/navigation에 있으니 import시 주의하자.
 *
 * 2. pathname이나 query같은 메서드들은 별도의 커스텀 훅으로 분리되었다.
 *
 * 3. 앱 라우터의 useRouter는 아래의 메서드들을 가진다.
 *
 *    - push(href: string, { scroll: boolean }) : 이동한다. 히스토리 스택에 추가된다.
 *
 *    - replace(href: string, { scroll: boolean }) : 교체한다. 히스토리 스택에서 페이지 이동을 시작한 페이지가 도착한 페이지로 교체된다.
 *
 *    - refresh() : 새로고침한다. 히스토리는 변하지 않으며 리액트 서버에서는 서버 요청, 서버 컴포넌트 렌더링부터 다시한다.
 *                         클라이언트측에서는 useState같은 리액트 상태나 스크롤 위치같은 브라우저 상태는 유지된다고 한다.
 *
 *    - prefetch(href: string) : 해당 경로의 데이터를 준비시킨다. Link컴포넌트의 prefetching을 수동으로 하는 것과 같다.
 *
 *    - forward() : 앞으로가기 back과 forward 메서드는 스크롤을 유지한다.
 *
 *    - back() : 뒤로가기. 상식이지만, 뒤로가기를 실행한 다음 페이지 이동 발생시 앞으로가기 히스토리는 사라진다.
 *
 * 4. 기존 useRouter에서 분리된 usePatchname과 useSearchParams에 대한 설명은 아래와 같다.
 *
 *    -usePatchname : 딱 pathname만 가지고 오는 훅. pathname만 필요할 때 이제 useRouter를 쓸 필요가 없다.
 *
 *                    ref : https://nextjs.org/docs/app/api-reference/functions/use-pathname
 *
 *    -useSearchParams : web api의 URLSearchParams객체를 읽기전용으로 반환한다.
 *                       get메서드로 특정 쿼리에 대한 값을 받을 수 있고, has메서드로 특정 쿼리가 존재하는지 판단할 수 있다.
 *
 *                       ref(Hook) : https://nextjs.org/docs/app/api-reference/functions/use-search-params
 *                       ref(URLSearchParams API) : https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams
 *
 *
 * ref : https://nextjs.org/docs/app/api-reference/functions/use-router
 * ref(History API) : https://developer.mozilla.org/ko/docs/Web/API/History_API
 *
 */
export default function UseRouterPage() {
  const router = useRouter()
  const pathname = usePathname()
  const SearchParams = useSearchParams()
  const query = SearchParams.get('a')

  useEffect(() => {
    const url = `${pathname}?${query}`
    console.log(url)
  }, [pathname, query])

  return (
    <ul>
      <li>
        URL :
        <span className="text-cyan-400">
          {pathname}
          {query ? `?${query}` : null}
        </span>
      </li>
      <li>
        {/* router.push */}
        <LinkButton
          text="UseRouter.push to Root"
          method={() => {
            router.push('/', { scroll: false })
          }}
          color="bg-amber-600"
        />

        {/* router.replace */}
        <LinkButton
          text="UseRouter.replace to Root"
          method={() => {
            router.replace('/', { scroll: false })
          }}
          color="bg-green-600"
        />

        {/* router.refresh */}
        <LinkButton
          text="Refresh"
          method={() => {
            router.refresh()
          }}
          color="bg-indigo-600"
        />

        {/* router.back */}
        <LinkButton
          text="Move to Back"
          method={() => {
            router.back()
          }}
          color="bg-red-600"
        />

        {/* router.forward */}
        <LinkButton
          text="Move to Forward"
          method={() => {
            router.forward()
          }}
          color="bg-sky-600"
        />

        {/* router.prefetch */}
        <LinkButton
          text="Prefetch"
          method={() => {
            router.prefetch('/linking-and-navigating')
          }}
          color="bg-teal-600"
        />
      </li>
    </ul>
  )
}
