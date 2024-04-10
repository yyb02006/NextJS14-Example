import { ReactNode } from 'react'

/**
 *
 * Routing => [Route Groups]
 *
 *
 * 1. 라우트를 (name) 폴더로 감싸서 그룹핑할 수 있다. 이렇게 지정된 라우트 그룹은 URL에 어떤 영향도 끼치지 않는다.
 *
 * 2. 각 라우트 그룹 안에 layout을 만들어서 라우트 그룹마다 고유한 layout을 갖게 할 수 있다.
 *    이 기능은 루트 레이아웃에서도 유효하기 때문에, 루트 레이아웃을 삭제하고 라우트 그룹을 지정해서 각 라우트마다 색다른 경험을 연출할 할 수 있다.
 *    그러나 이렇게 루트 레이아웃을 나눌 때는 루트 페이지가 반드시 그룹 라우트 중 어딘가에 들어가 있어야 한다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/route-groups
 *
 * */
export default function HelloLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      this color is amber<div className="bg-amber-600">{children}</div>
    </section>
  )
}
