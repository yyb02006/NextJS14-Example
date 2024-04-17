import { ReactNode } from 'react'

/**
 *
 * Routing => [Intercepting Routes]
 *
 *
 * 1. 인터셉팅 라우트는 현재 라우트를 다른 URL로 연결할 수 있는 기술이다.
 *
 * 2. (..)photo라는 폴더가 있을 경우 feed 라우트 내에서 /photo/[id] 경로에 대한 페이지 이동은 전부 /feed/photo/[id] 로 인터셉트된다.
 *
 * 3. 라우트를 인터셉팅한 상태에서 Hard Navigating할 경우 실제 해당 URL 라우트로 이동한다.
 *
 * 4. 인터셉트된 상태의 라우트에서 새로고침이나 URL 입력과 같은 수동적인 방법을 통하지 않고
 *    실제 라우트로 이동할 때 navigating과 관련된 요소들은 아래와 같이 작동한다.
 *
 *    - <Link> : 사용할 수 없다. 같은 URL에 대해 제대로 작동하지 않는다.
 *
 *    - useRouter : 사용할 수 없다. push나 refresh와 같은 메서드도 실제 라우터로 리렌더링하지 않는다.
 *
 *    - redirect : 사용할 수 있다. 그러나 이벤트 핸들러와 함께 사용할 수 없으므로 몇 초뒤 리다이렉트하는 미리보기 페이지 정도의 예시에서 사용할 수 있다.
 *
 *    - window object : 사용할 수 있다. 인터셉팅된 페이지에서는 window 객체의 location.href 메서드를 변경하는 방법으로
 *                      페이지 이동을 할 경우 Hard Navigating되기 때문에 사용할 수 있다. 단, 이 경우 페이지는 풀 리로드된다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes
 *
 * */
export default function InterceptingRoutesLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      Hello InterceptingRoutesLayout!<div>{children}</div>
    </section>
  )
}
