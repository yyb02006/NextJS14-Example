import { ReactNode } from 'react'

/**
 *
 * Routing => [Error Handling]
 *
 *
 * 1. layout은 동일한 세그먼트에 있는 error가 생성하는 ErrorBoundary 컴포넌트 외부에 있기 때문에 에러가 발생해도 정상적으로 렌더링된다.
 *    template역시 error의 외부 계층에 존재하기 때문에 마찬가지이다.
 *
 * 2. layout의 에러를 감지하려면 상위 세그먼트의 error를 이용해야한다. 그러나 이렇게 하면 상위 세그먼트의 page가 ErrorBoundary 컴포넌트에 같이 포함된다.
 *    그렇기 때문에 layout이나 template의 경우 내부적으로 에러를 핸들링하는 방향을 고민해봐야한다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/error-handling
 *
 * */
export default function ErrorHandlingLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      Hello ErrorHandlingLayout!<div>{children}</div>
    </section>
  )
}
