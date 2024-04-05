import FetchComment from '#/components/fetch-comment'
import FetchPost from '#/components/fetch-post'
import { Suspense } from 'react'

/**
 *
 * Routing => [Loading UI and Streaming]#Streaming with Suspense
 *
 *
 * 1. 스트리밍이란, "서버에서 생성된 HTML을 작은 조각으로 나누고, 이 조각들을 서버에서 클라이언트로 점진적으로 전송하는 것"을 말한다.
 *    하지만 오해하지 말아야할 것이, HTML을 나누는 것이 스트리밍의 핵심적인 목적은 아니다.
 *    우선, SSR의 렌더링 과정은 아래를 따르며, 각 단계는 이전 단계가 모두 끝난 후에만 다음 단계로 넘어갈 수 있다.
 *
 *    1. 지정된 페이지의 모든 데이터를 서버에서 페칭.
 *
 *    2. 그런 다음 서버에서 페이지의 HTML을 렌더링.
 *
 *    3. 페이지의 HTML, CSS 및 JavaScript를 클라이언트로 전송.
 *
 *    4. 생성된 HTML과 CSS를 사용하여 비대화형 사용자 인터페이스 표시.
 *
 *    5. 마지막으로, React는 사용자 인터페이스에 하이드레이트하여 대화형 인터페이스 생성.
 *
 *    여기의 1번 과정에서 페칭하는 데에 10초가 걸리는 데이터가 있다고 해보자. 이 데이터는 1번 과정 자체를 10초 만큼 지연시킨다.
 *    다른 모든 데이터가 0.01초만에 페칭되었어도 10초가 걸리는 데이터가 있는 컴포넌트 때문에 전체 과정이 10초 지연된다.
 *    이는 전체 페이지의 렌더링이 끝나야 클라이언트에서 코드를 로드할 수 있는 SSR의 전통적인 문제이며,
 *    프로젝트의 모든 곳에서 SSR을 사용했을 때, 매 페이지 이동마다 긴 TTFB(Time To First Byte)가 발생하는 원인이 된다.
 *
 *    해당 데이터가 초기 페이지에 포함되는 게 필수가 아니라면, 스트리밍은 10초가 걸리는 이 데이터를 따로 떼네는 역할을 할 수 있다.
 *    다른 데이터들이 렌더링되는 동안 이렇게 떼어진 데이터는 비동기적으로 로드되어 하나의 청크로 간주된다.(SSR이 실제 청크에 관여하지는 않음)
 *
 *    다른 데이터들로 렌더링된 페이지가 클라이언트로 전송되고, 렌더링되고, 하이드레이트 되는 때에도
 *    스트리밍된 컴포넌트들은 별도의 타임라인에서 작업되어 완료되는 순서대로 점진적으로 클라이언트 HTML에 포함된다.
 *
 *    이 같은 과정을 거쳐 사용자는 SSR임에도 굉장히 빠르게 대화형 초기페이지를 일부 볼 수 있게 된다.
 *    초기 페이지 로드가 굉장히 빠른 CSR같은 느낌도 받을 수 있을 것이다.
 *
 *    레이아웃 쉬프트를 최소화할 수 있도록 제대로된 fallback을 할당하거나, 따로 공간을 확보하는 것을 잊지 말자.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense
 *
 * */
export default function StreamingComponentsPage() {
  return (
    <section>
      Hello StreamingComponentsPage!
      <Suspense fallback={<p>loading post...</p>}>
        <FetchPost />
      </Suspense>
      <Suspense fallback={<p>loading comments...</p>}>
        <FetchComment />
      </Suspense>
    </section>
  )
}
