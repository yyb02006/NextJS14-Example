import { permanentRedirect } from 'next/navigation'

const timeout = (id: string) =>
  new Promise<{ success: boolean; role: string }>((resolve) => {
    setTimeout(() => {
      resolve({ success: false, role: id })
    }, 3000)
  })

/**
 *
 * Functions => [permanentRedirect]
 * Routing => [Linking and Navigating]#redirect function
 *
 *
 * 1. permanentRedirect 함수는 아래와 같이 상황에 따라 다른 상태 코드를 응답한다.
 *
 *    - 스트리밍 컨텍스트 : 클라이언트 사이드에서 리디렉션을 하도록 HTML에 메타 태그를 삽입한다.
 *
 *    - 서버 액션 : 303(See Other) 상태 코드를 응답하며, 리다이렉션 타겟 URL을 GET으로 요청한다.
 *
 *    - 그 외 : 308(Permanent) 상태 코드를 응답하는 영구 리디렉션 기능을 제공한다.
 *
 * 2. 영구 리디렉션은 사용자와 검색엔진 양쪽에 아래와 같은 영향을 미친다.
 *
 *    - 검색 엔진 : 308 코드는 웹 페이지의 주소가 영구적으로 변경되었음을 알린다. 이를 통해서 검색 엔진은 새 URL을 색인하고
 *               *링크 주스(Link Juice)나 **페이지 랭크(Page Rank) 같은 가치를 새 URL로 이전하는 데 도움을 준다.
 *
 *    - 사용자 : 리다이렉션에 대한 정보가 브라우저나 서버에 캐싱될 수 있고 이렇게 되면 추가적인 HTTP요청 없이 자동으로 새 URL에 접근할 수 있게 된다.
 *            페이지 요청이 한 번 단축되기 때문에 서버 부하를 줄이고 사용성이 증가한다.
 *
 * 4. 파라미터로 path와 type을 가진다. 각 타입에 대한 설명은 아래와 같으며, redirect 함수와 거의 동일하다.
 *
 *    - path(string) : 리다이렉션 타겟 URL
 *
 *    - type('replace' | 'push') : 히스토리 스택에 replace를 할 건지, push를 할 건지 정한다. 기본값은 서버 액션에서 사용되면 'push', 아니면 'replace'이다.
 *
 *
 * *링크 주스 : 링크 수신과 같은 페이지에서 페이지로 전달되는 관련성을 바탕으로 측정되는 일종의 영향력 점수. 링크주스가 많을수록 검색엔진에서 나타나는 순위가 높아진다.
 *
 * **페이지 랭크 : 다른 페이지로부터의 링크의 수와 품질에 따라 결정되는 검색 엔진 결과 상의 순위.
 *
 *
 * ref : https://nextjs.org/docs/app/api-reference/functions/permanentRedirect
 *
 * */
export default async function PermanentRedirect() {
  const response = await timeout('user')
  !response.success ? (
    permanentRedirect('/linking-and-navigating')
  ) : (
    <div>Hello PermanentRedirectPage!</div>
  )
}
