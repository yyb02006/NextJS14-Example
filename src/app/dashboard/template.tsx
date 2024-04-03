/**
 *
 * Routing => [Pages and Layouts]#Templates
 *
 *
 * 1. template은 layout과 비슷하지만, 사용자가 경로 이동시 새 인스턴스를 생성한다는 차이가 있음. 리렌더링됨.
 *
 * 2. 상태가 보존되지 않음. 이것 역시 계속 새 인스턴스를 생성하기 떄문.
 *
 * 3. 중첩될 때 구조상으로 layout바로 밑에서 렌더링됨.
 *
 * 4. 대략 아래와 같은 output상황이 됨
 *
 *    <Layout>
 *      //template는 렌더링 시 unique key를 가짐
 *      <Template key={routeParam}>{children}</Template>
 *    </Layout>
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#templates
 *
 * */
export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
