'use client'

import NavButton from '#/components/NavButton'
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation'
import { ReactNode } from 'react'

/**
 *
 * Routing => [Parallel Routes]
 *
 *
 * 1. Parallel Routes는 Slot을 운영하는 라우트 방법이다. 직관적으로 Slots라는 라우팅 방법이라고 생각하면 된다.
 *
 * 2. "@folderName" 같은 방법으로 폴더이름을 설정하면 이 폴더는 Slot이 되는데, Slot은 본인 포함 하위 경로를 전부 URL경로에 포함시키지 않는다.
 *
 * 3. 그럼 이걸 어떻게 요청해서 렌더링할 거냐?
 *    root 경로의 하위 경로가 children props로 전달되는 것처럼, Slot으로 설정한 경로도 "@"를 제외한 식별자 형태로 상위 layout의 props에 전달된다.
 *    즉, Slot내부의 컴포넌트들은 상위 layout에서 props로 받아와서 렌더링 해야하고,
 *    Props는 기본적으로 상위 경로로부터 사용자가 접근한 경로와 일치하는 Slot의 하위 경로의 컴포넌트를 담고 있다.
 *
 *    예를 들어, "@hello"와 "@world"라는 슬롯이 "parallel-routes"라는 상위 경로의 layout에서 렌더링되어 있는 상태라면 /parallel-routes/hello를 탐색할 때,
 *    layout에서 props로 받아온 hello와 world 슬롯들은 각각 아래와 같은 경로의 컴포넌트 트리를 렌더링하게 된다.
 *
 *    "@hello(hello)" : /@hello/hello
 *
 *    "@world(world)" : /@world/hello
 *
 *    "parallel-routes(children)" : /hello
 *
 * 4. /@hello/hello가 존재하지 않을 경우 기본적으로 해당 슬롯 아래의 default파일을 대신 렌더링 하지만, 경우에 따라 아래와 같이 처리된다.
 *
 *    현재 접근한 경로의 슬롯들과 root 중에 하나라도 컴포넌트를 리턴하는 page.tsx를 가지고 있지 않을 경우, NextJS는 아래의 경우에 따라 다르게 처리한다.
 *
 *    1. Soft Navigating(Link 컴포넌트나 useRouter를 이용한 클라이언트 탐색)
 *
 *       이 때 NextJS는 부분 렌더링을 수행하며, 이 때문에 현재 URL과 일치하는 경로가 슬롯이나 root에 없을 경우, 이전에 렌더링했던 페이지를 계속 유지한다.
 *       예를 들어, /parallel-routes 경로에서 /parallel-routes/world 경로로 이동했으나,
 *       world 경로가 "@hello"슬롯에 존재하지 않을 경우, 이전에 렌더링된 /@hello/page.tsx를 계속 유지한다.
 *
 *    2. Hard Navigating(새로고침이나 URL입력을 통한 탐색)
 *
 *       이 때 NextJS는 풀-페이지 로드를 수행하며, 당연하게도 기존 상태를 유지할 수 없다.
 *       현재 URL과 일치하는 슬롯 경로가 있다면, 해당 슬롯을 렌더링할 수 있다.
 *       그러나 해당 슬롯의 경로에 page 파일이 존재하지 않는다면 우선 해당 슬롯이 가지고 있는 default 파일을 찾고,
 *       default 파일이 존재한다면 default 파일을, 없다면 page 파일을 렌더링 한다.
 *       둘 다 존재하지 않는다면, 404에러 페이지를 렌더링 한다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
 *
 * */
export default function ParallelRoutesLayout({
  children,
  hello,
  world,
}: {
  children: ReactNode
  hello: ReactNode
  world: ReactNode
}) {
  /**
   *
   * Routing => [Parallel Routes]#useSelectedLayoutSegment(s)
   *
   *
   * 1. useSelectedLayoutSegment(parallelRoutesKey? : string)
   *
   *    useSelectedLayoutSegment 훅은 parallelRouteKey 파라미터에 식별자를 전달했을 때, 해당 식별자의 슬롯이 현재 렌더링하고 있는 경로를 리턴해준다.
   *    해당 슬롯의 root경로라면 null이나 "page$"를 리턴한다. 슬롯이 없더라도 쓰이는 훅이기 때문에 기본적으로 root를 추적한다.
   *
   *    ref : https://nextjs.org/docs/app/api-reference/functions/use-selected-layout-segment
   *
   * 2. useSelectedLayoutSegments(parallelRoutesKey? : string)
   *
   *    useSelectedLayoutSegments 훅은 말 그대로 위의 훅에서 리턴 값을 해당 세그먼트까지의 전체 경로로 반환한다.
   *
   *    ref : https://nextjs.org/docs/app/api-reference/functions/use-selected-layout-segments
   *
   * 3. parallelRoutesKey
   *
   *    슬롯의 식별자를 뜻하는 파라미터로, "@folderName"경로에서 folderName이 슬롯의 식별자이다.
   *
   * 4. 참고 사항
   *
   *    왜인지는 몰라도 첫 번째 슬롯에 대해서만 /경로에서 "page$"대신 null을 반환하는 현상이 있음.
   *    공식문서에서 "page$"에 대한 언급은 없으니 null이 정상이고, "page$"가 이상한 것일 수도 있다.
   *    세그먼트에 대한 작동 자체는 정상.
   *
   *
   * ref : https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#useselectedlayoutsegments
   *
   */
  const helloSlot = useSelectedLayoutSegment('hello')
  const worldSlot = useSelectedLayoutSegment('world')
  const rootChildren = useSelectedLayoutSegment()
  const selecteds = useSelectedLayoutSegments('hello')
  console.log('hello = ' + helloSlot, ',world = ' + worldSlot, ',root = ' + rootChildren, selecteds)
  const navButtons = [
    { label: 'to Hello', path: '/parallel-routes/hello' },
    { label: 'to World', path: '/parallel-routes/world' },
    { label: 'to Parent', path: '/parallel-routes' },
  ]
  return (
    <section className="h-screen">
      <nav className="fixed w-full border-b bg-black px-10">
        <div className="flex h-16 items-center justify-around border-x">
          <div className="flex h-full w-full flex-shrink-[2] items-center justify-center hover:bg-sky-600">
            Global Nav in Parallel Routes Layout
          </div>
          <ul className="flex h-full w-full max-w-[70%] items-center justify-between">
            {navButtons.map((navButton) => {
              const { label, path } = navButton
              return <NavButton label={label} path={path} key={path}></NavButton>
            })}
          </ul>
        </div>
      </nav>
      <section className="flex h-full w-full items-center justify-center pt-16">
        <div className="gire grid h-[600px] w-[1200px] grid-cols-2 gap-4 text-2xl font-bold ">
          <div
            className={`flex h-full w-full items-center justify-center ${rootChildren === '__DEFAULT__' ? 'bg-pink-800' : 'bg-pink-500'}`}
          >
            {children}
          </div>
          <div className="flex w-full flex-col gap-4">
            <div
              className={`flex h-full items-center justify-center ${helloSlot === '__DEFAULT__' ? 'bg-indigo-800' : 'bg-indigo-500'}`}
            >
              {hello}
            </div>
            <div
              className={`flex h-full items-center justify-center ${worldSlot === '__DEFAULT__' ? 'bg-sky-800' : 'bg-sky-600'}`}
            >
              {world}
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
