/**
 *
 * Caching => #Full Route Cache
 *
 *
 * 1. Full Route Cache는 빌드시에 RSC Payload생성하고, 이 RSC Payload를 이용해 HTML을 미리 렌더링 해서
 *    이후 런타임에서 페이지에 대한 요청이 들어왔을 때, 페이지를 새로 렌더링하지 않고
 *    준비되어 있는 에셋을 제공하여 서버 부하를 줄이는 기능을 하는 캐시이다.
 *
 * 2. 페이지 라우터에서 존재하던 SSG와 같은 기능이라고 생각할 수 있으며,
 *    이 캐싱에 사용되는 Static Rendering이라는 렌더링 방식 또한
 *    Static Site Generation과 매우 유사하게 이해할 수 있다.
 *
 * 3. Next 프로젝트를 빌드할 때 RSC Payload라는 것이 만들어지는데, RSC Payload는 압축된 DOM이라고 보면 된다.
 *    이 압축된 DOM에서는 아직 렌더링되지 않은 Suspense나 클라이언트 컴포넌트가 꽂혀야할 자리에 대한 플레이스홀더와
 *    기본적인 DOM 정보, 해당 컴포넌트들에 대한 프로퍼티, js참조 등이 존재한다.
 *    이러한 RSC Payload를 통해 매번 페이지에 있는 모든 코드를 실행시키지 않아도 DOM을 업데이트할 수 있게 된다.
 *
 * 4. Next 프로젝트를 빌드하면 라우트 핸들러와 다이나믹 렌더링을 제외한 라우트에 대해 RSC Payload와 HTML 등의 에셋이 만들어진다.
 *    이 결과물들은 .next/server/app 경로에 .html, .rsc 등의 정적 파일들로 저장되어 있음을 알 수 있는데,
 *    이것이 바로 Full Route Cache의 캐시 데이터이다.
 *
 * 5. Full Route Cache의 경우 빌드 시 이외에도 재검증이 가능한데, 재검증 시 다시 RSC Payload와 HTML이 SET된다.
 *
 * 6. 클라이언트 사이드에서 Router Cache에 데이터가 없다면 클라이언트는 서버에게 페이지에 대한 렌더링 에셋을 요청하고,
 *    서버에서 재검증 등의 이유로 Full Route Cache를 SKIP하거나 요청한 에셋이 캐시 내부에 없다면, 서버사이드에서 RSC Payload와 HTML을 다시 렌더링하게 된다.
 *
 * 7. Full Route Cache가 Opting Out된 라우트에서는 Full Route Cache 과정을 건너뛰게 되고, 서버에서 다시 렌더링된다.
 *    빌드 시 특정 경로에 대해 Full Route Cache가 작동하지 않는(Opting Out) 이유는 아래와 같다.
 *
 *    - 다이나믹 렌더링이거나 캐시를 허용하지 않는 fetch요청이 있는 경우
 *
 *      Data Cache가 Opting Out된 상태이기 때문에
 *      매번 데이터를 불러와서 매번 렌더링 해야하므로 Full Route Cache는 작동하지 않는다.
 *
 *    - 경로에서 다이나믹 펑션을 사용할 경우
 *
 *      이런 경로를 렌더링하기 위해선 런타임에만 알 수 있는 정보들이 필요하므로 빌드시에는 렌더링할 수 없게 되어서
 *      다이나믹 펑션을 사용한 경로도 마찬가지로 다이나믹 렌더링이 작동하게 된다.
 *
 * 8. 다이나믹 렌더링으로 서버에서 렌더링된 RSC Payload는 Router Cache에 저장되지만, 이후에도 Full Route Cache에는 여전히 캐싱되지 않는다.
 *
 * 9. Client Component는 기본적으로 RSC Payload가 없기 때문에 Full Route Cache와 Router Cache의 대상에 해당되지 않는다.
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
