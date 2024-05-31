// Request Memoization
// 인터렉션이나 로딩으로 인해 발생하는 하나의 렌더링 시퀀스 안에서 같은 요청이 반복될 때, 실제로 요청하지 않고 응답을 재활용하는 것을 말한다.
// 렌더링 중에만 유지되는 캐시이며, 렌더링이 끝난 후에는 당연히 캐시가 무효화된다.

// Data Cache
// fetch로 데이터 요청할 때의 캐싱이다. Nextjs14 에서는 fetch가 서버에서 캐싱될 수 있도록 기능을 확장해놨다.
// 서버에서 사용한 fetch는 Data Cache에 JSON 형태로 저장되는데, 빌드타임과 런타임 두 상황 모두 서버에서 fetch가 이루어진다면 캐시가 남는다.
// 주로 Revalidating이나 Dynamic Rendering에서 활성화된다.

// Router Cache
// 브라우저가 서버컴포넌트가 있는 페이지를 요청했을 때, NextJs는 서버에서 Full Route Cache(미리 생성된 HTML과 RSC Payload 캐시)를 찾거나 동적으로 렌더링한다.
// 이후 브라우저 메모리에 해당 RSC payload가 캐시되고, 다음번 탐색에서는 캐시된 RSC로 페이지를 렌더링하게 된다.
// ref : https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering

// Full Route Cache
// NextJs는 빌드시에 라우트에 대해 렌더링한 결과인 static 파일들과 RSC Payload를 가지고 있는 상태가 된다.
// 이 것을 캐시하여 서버에 페이지를 요청할 때 응답하도록 만들어놓은 것을 Full Route Cache라고 한다.
// Dynamic Rendering 시에도 요청시점에 전체 페이지를 처음부터 렌더링하는 것이 아니라 Full Route Cache를 이용한다.
// Revalidating이나 Dynamic Rendering때에 서버에서 fetch가 작동하면 Data Cache도 동시에 사용된다.
export default function Caching() {
  return (
    <ul>
      <li>Request Memoization</li>
      <li>Data Cache</li>
      <li>Router Cache</li>
      <li>Full Route Cache</li>
    </ul>
  )
}
