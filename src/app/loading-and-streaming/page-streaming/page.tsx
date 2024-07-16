import ChildComponent from './ChildComponent'

/**
 *
 * Routing => [Loading UI and Streaming]#instant-loading-states
 *
 *
 * 1. 페이지단위의 스트리밍 loading 스페셜 파일은 리턴하는 컴포넌트를 fallback으로 가지는 suspense컴포넌트로 렌더링된다.
 *    suspense컴포넌트는 자손 컴포넌트 중 비동기적 동작이 발생하는 컴포넌트를 발견하면 해당 동작이 완료될 때까지 fallback을 반환한다.
 *    자손의 어느곳에서 비동기가 발생하더라도 자손 전체가 지연되며, 모든 비동기 동작이 완료될 때까지 지연된다.
 *
 * 2. 따라서 loading 스페셜파일로 진행되는 스트리밍도 Suspense컴포넌트를 직접적으로 사용하는 컴포넌트 스트리밍과 마찬가지 과정을 거친다.
 *    스트리밍에 대한 정확한 설명은 아래 공식문서 링크나 component-streaming 세그먼트 page.tsx 파일 참고.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#instant-loading-states
 *
 * */
export default function PageStreamingPage() {
  return (
    <section>
      <ChildComponent />
    </section>
  )
}
