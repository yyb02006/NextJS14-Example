import { ReactNode } from 'react'

/**
 *
 * Routing => [Intercepting Routes]#Example
 *
 *
 * 1. Parallel Routes와 Intercepting Routes를 함께 사용할 수 있다.
 *    모달을 병렬 라우팅 했을 때의 이점은 모달이 부모 페이지 컴포넌트 내부가 아닌 부모 레이아웃에서 병렬로 렌더링되기 때문에
 *    모달을 여닫는 과정에서 모달이 아닌 요소들이 영향을 받지 않는다는 점이다.
 *
 * 2. 모달의 Closed 상태를 구현하기 위해서는 null을 리턴하는 default 파일을 만들면 된다.
 *
 * 3. 모달을 인터셉팅 라우트로 구현하므로써 모달이 관련된 페이지의 URL을 가리킬 수 있게 되고,
 *    사용자가 back, forward 이동으로 모달의 여닫음 동작을 기대할 수 있게 된다.
 *
 * 4. 파일 시스템이 너무 더러워지는 것에 비해 얻는 이점이 그다지 특별하지 않을 수 있다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes#examples
 *
 * */
export default function FeedWithSlotLayout({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <section>
      {children}
      {modal}
    </section>
  )
}
