import { mockFunction } from '#/utils/mockFunction'
import { timeout } from '#/utils/timeout'
import { redirect } from 'next/navigation'

/**
 *
 * Functions => [redirect]
 * Routing => [Linking and Navigating]#redirect function
 *
 *
 * 1. 서버 컴포넌트에서는 useRouter훅의 기능 일부를 redirect가 대신 수행할 수 있다.
 *
 * 2. 내부적으로 정상 작동하는 상황에서도 error를 throw하므로 try/catch블록에서 사용하면 안된다.
 *
 * 3. 기본적으로 리다이렉션 시 일반적인 302 상태 코드가 아닌 307 상태 코드를 응답한다.
 *    단, server action에서 사용할 시 제출 상황이 아니기 때문에 303 상태 코드를 응답한다.
 *    이러한 이유는 HTTP클라이언트들이 302응답을 받았을 때 리다이렉트 요청을 *GET으로 보내는 경향이 있기 때문에 원래의 요청을 유지하기 위함이다.
 *    HTTP/1.1 표준에서는 이를 명확히 나누는 **303(See Other)과 ***307(Temporary Redirect) 상태코드가 도입되었다.
 *
 * 4. never타입이기 때문에 JSX를 return할 필요 없이 redirect만 단독으로 사용할 수 있다.
 *
 * 5. 클라이언트 컴포넌트에서도 호출할 수 있지만 이벤트 핸들러에서는 호출할 수 없다.
 *
 * 6. 파라미터로 path와 type을 가진다. 각 타입에 대한 설명은 아래와 같다.
 *
 *    - path(string) : 리다이렉션 타겟 URL
 *
 *    - type('replace' | 'push') : 히스토리 스택에 replace를 할 건지, push를 할 건지 정한다. 기본값은 replace이다.
 *
 *
 * *HTTP/1.0 표준에선 리다이렉트를 요청을 어떤 메서드로 할 지 명시적으로 규정하지 않았다.
 *
 * **303(See Other) : GET 메서드로 요청. ex) 요청 완료에 대한 리다이렉트
 *
 * ***307(Temporary Redirect) : 이전 요청 메서드를 유지. ex) POST 요청을 그대로 다른 URL로 전달해야하는 경우
 *
 *
 * ref(function) : https://nextjs.org/docs/app/api-reference/functions/redirect
 * ref(routing) : https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#redirect-function
 *
 * */
export default async function ServerRedirecting() {
  const response = await timeout({ success: false, resolveProps: { role: 'admin' } })
  const environment = process.env.NODE_ENV
  if (environment === 'test') {
    response.success || mockFunction('/linking-and-navigating')
  } else {
    response.success || redirect('/linking-and-navigating')
  }
  return (
    <div>
      <p>Hello ServerRedirecting Page!</p>
      <div>your role is {response.role}</div>
    </div>
  )
}
