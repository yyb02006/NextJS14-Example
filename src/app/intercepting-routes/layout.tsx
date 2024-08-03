import Link from 'next/link'
import { ReactNode } from 'react'

const NavButton = ({ label, path }: { label: string; path: string }) => {
  return (
    <li className=" h-full w-full border-l">
      <Link
        className="flex h-full w-full items-center justify-center hover:bg-amber-500"
        href={path}
      >
        {label}
      </Link>
    </li>
  )
}

/**
 *
 * Routing => [Intercepting Routes]
 *
 *
 * 1. 인터셉팅 라우트는 현재 페이지의 컨텍스트를 유지하면서 다른 URL을 현재 레이아웃 안에서 표현할 수 있는 기술이다.
 *    예를 들어, 모달이나 세부 페이지의 프리뷰를 띄울 때, 경로를 인터셉트해서 뒤로가기 기능으로 모달을 닫도록 만들 수 있다.
 *
 * 2. 인터셉트가 작동하기 위해서는 내가 만들 인터셉팅 라우트가 원래의 실제 경로를 가리킬 수 있도록 만들어야 한다.
 *    이를 위해 (.)photo (..)photo같은 폴더를 만들어 사용하는데, 각각의 용례는 아래와 같다.
 *
 *    1. (.) : 인터셉팅 라우트를 형제 세그먼트와 일치시킨다. = 실제 라우트가 같은 단계에 존재한다.
 *
 *    2. (..) : 인터셉팅 라우트를 1단계 위의 부모 세그먼트와 일치시킨다. = 실제 라우트가 부모 단계에 존재한다.
 *
 *    3. (..)(..) : 인터셉팅 라우트를 2단계 위의 부모 세그먼트와 일치시킨다. = 실제 라우트가 조부모 단계에 존재한다.
 *
 *    4. (...) : 인터셉팅 라우트를 app디렉토리와 일치시킨다. = 실제 라우트가 Root 아래에 존재한다.
 *
 *    *각 단계에 대한 설명은 URL 경로상의 기준이며 파일 시스템 상의 기준이 아니다.
 *     즉, 실제 라우트에 반영되지 않는 (folderName)같은 라우트 그룹이나 "@folderName"같은 슬롯은 단계에 포함되지 않는다.
 *
 * 3. 라우트를 인터셉팅한 상태에서 같은 경로에 대해 Hard Navigating할 경우 실제 해당 URL 라우트로 이동한다.
 *
 * 4. 인터셉트된 상태의 라우트에서 새로고침이나 URL 입력과 같은 수동적인 방법을 통하지 않고
 *    실제 라우트로 이동하려고 할 때 navigating과 관련된 요소들은 아래와 같이 작동한다.
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
  const navButtons = [
    { label: 'to Feed', path: '/intercepting-routes/feed' },
    { label: 'to Photo', path: '/intercepting-routes/photo' },
  ]
  return (
    <section>
      <nav className="border-b px-10">
        <article className="flex h-16 items-center justify-around border-x">
          <div className="flex h-full w-full flex-shrink-[2] items-center justify-center hover:bg-sky-600">
            Global Nav in intercepting-routes Layout
          </div>
          <ul className="flex h-full w-full max-w-[70%] items-center justify-between">
            {navButtons.map((navButton) => {
              const { label, path } = navButton
              return <NavButton label={label} path={path} key={path}></NavButton>
            })}
          </ul>
        </article>
      </nav>
      {children}
    </section>
  )
}
