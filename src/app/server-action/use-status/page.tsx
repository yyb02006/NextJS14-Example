'use client'

import SubmitButton from './SubmitButton'
import createInvoice from './fetchFunction'

/**
 *
 * React => [useFormStatus]
 *
 *
 * 1. useformStatus 훅은 form Element 내부에서 렌더링되어야 하며, 어떤 파라미터도 받지 않는다.
 *
 * 2. useformStatus 훅은 자신을 감싼 form Elements 중 자신과 가장 가까운 해당 form의 데이터를 반환하게 된다.
 *
 * 3. 반환 값들은 아래와 같다
 *
 *    - pending(boolean) : true일 경우 폼 제출이 아직 끝나지 않았음을 나타낸다. 이 경우 외에는 모두 false이다.
 *
 *    - data(FormData) : 훅이 감지하고 있는 부모 form의 데이터를 포함하는 FormData 인터페이스의 구현체를 반환하지만,
 *                      제출하지 않았거나 부모 form Element가 없다면 null을 반환한다.
 *
 *    - method(string) : get이나 post와 같은 제출에 사용된 HTTP 메서드를 반환한다. form Element는 기본적으로 GET을 사용하지만 POST 등의 다른 메서드도 사용 가능하다.
 *
 *    - action(function) : form Element의 action 프로퍼티에 전달된 함수의 참조. 부모 form Element가 없거나, 액션 프로퍼티가 function이 아닐 경우 null을 반환한다.
 *
 * 4. 테스팅시에 테스팅 프레임워크와 next 사이의 react 버전 불일치 문제로 useFormStatus를 테스팅하지 못하는 이슈가 있다.
 *
 *    ref : https://github.com/vercel/next.js/issues/54757#issuecomment-2015168447
 *    ref : https://stackoverflow.com/questions/78136654/testing-a-next-js-component-with-useformstate-from-react-dom-or-alternatives
 *
 *
 * ref(FormData) : https://developer.mozilla.org/en-US/docs/Web/API/FormData
 * ref : https://react.dev/reference/react-dom/hooks/useFormStatus
 *
 */

/**
 *
 * Data Fetching => [Server Actions and Mutations]#Pending States
 *
 *
 * 1. useFormStatus 훅을 사용해 Pending 상태를 따로 구현하지 않고 사용할 수 있다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#pending-states
 *
 */
export default function UseStatusPage() {
  return (
    <form action={createInvoice}>
      <input type="text" name="name" />
      <SubmitButton />
    </form>
  )
}
