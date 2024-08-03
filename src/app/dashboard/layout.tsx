/**
 *
 * Routing => [Pages and Layouts]#Layouts
 *
 *
 * 1. page와 다르게 layout은 현재 경로를 포함해 모든 자식 경로에도 적용된다.
 *
 * 2. 사용자가 다른 경로로 이동해도 layout의 적용범위 안이라면 상태와 상호작용을 유지하며 리렌더링되지 않는다.
 *
 * 3. 기본적으로 layout은 중첩할 수 있으며, 이를 통해 이전에는 별도의 컴포넌트로 정의하던 subTree에 대한 공통 레이아웃을 쉽게 만들 수 있다.
 *
 * 4. layout중첩시 fetch는 한 route에서도 여러 번 가능하며 중복되는 요청은 리액트가 성능에 영향을 주지 않고 자동으로 제거함.
 *
 * 5. layout이 children layout에게 data를 넘길 수 없음.
 *
 * 6. layout이 하위 경로의 segments에 접근할 수 없음. 하위 경로의 세그먼트의 상태에 따라 상위 layout을 바꿀 수 없다는 뜻.
 *
 * 7. 가능하게 하려면 useSelectedLayoutSegment or useSelectedLayoutSegments 훅 사용.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts
 *
 * */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <h1>Hello DashBoardLayout</h1>
      {children}
    </section>
  )
}
