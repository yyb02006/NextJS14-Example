/**
 *
 * Caching => #Full Route Cache
 *
 *
 * 1. Full Route Cache은 NextJS12 버전에서 존재하던 SSG와 같은 기능이라고 생각할 수 있다.
 *    NextJS 14의 서버사이드 렌더링 중 Static Rendering이라는 렌더링 방식이 Full Route Cache서 사용하는 방식이기도 하다.
 *
 * 2. Next 프로젝트를 빌드할 때 RSC Payload라는 것이 만들어지는데, RSC Payload는 압축된 DOM이라고 보면 된다.
 *    이 압축된 DOM에서는 기본적인 DOM 정보와 아직 렌더링되지 않은 서스펜스, 클라이언트 사이드 렌더링 시
 *    클라이언트 컴포넌트가 꽂혀야할 자리에 대한 플레이스홀더와 해당 컴포넌트들에 대한 프로퍼티, js참조 등이 존재한다.
 *    이러한 RSC Payload를 통해 계속적으로 페이지에 있는 모든 코드를 실행시키지 않아도 DOM을 업데이트할 수 있게 된다.
 *
 * 3. Next 프로젝트를 빌드하면 RSC와 자바스크립트를 바탕으로 라우트 핸들러와 다이나믹 라우트를 제외한 라우트에 대해 HTML이 만들어진다.
 *    이 결과물은 .next/server/app 경로에 있는 Static 파일들을 확인할 수 있는데, 이것이 Full Route Cache의 캐시 데이터이다.
 *
 * 4. Full Route Cache의 경우 빌드 시 이외에도 재검증이 가능한데 재검증 시 다시 RSC Payload와 HTML이 SET된다.
 *
 * 5. 클라이언트 렌더링이 필요한 경우 캐시된 HTML을 먼저 불러오고,
 *    RSC Payload로 DOM 정보로 DOM을 업데이트하고, 자바스크립트가 애플리케이션을 작동시키는 Hydration이 작동한다.
 *
 * 6. RSC Payload는 사용자가 페이지에 최초 방문했을 때 Router Cache에 저장되며 페이지 전환 시
 *    하이드레이션이 처음부터 다시 일어나는 것을 방지한다.
 *
 * 7. 다이나믹 라우트의 경우엔 Full Route Cache를 건너뛰게 되므로 Router Cache가 존재하지 않을 때 서버에서 Full Route Cache탐색을 건너뛰고 렌더링한다.
 *    이렇게 만들어진 RSC Payload는 Router Cache에 저장되지만, Full Route Cache에는 여전히 존재하지 않는다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/caching#full-route-cache
 *
 * */
export default function FullRouteCachePage() {
  console.log('Full-Route-Cached Page')
  return (
    <section>
      Hello FullRouteCachePage!
      <ul>
        <li>Un-Ordered List 1</li>
        <li>Un-Ordered List 2</li>
        <li>Un-Ordered List 3</li>
        <li>Un-Ordered List 4</li>
      </ul>
    </section>
  )
}
