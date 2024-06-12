import { ReactNode } from 'react'
import ClientFetchComponent from './ClientCatComponent'
import { ImageDiv } from './ImageDiv'

/**
 *
 * Caching => #Request Memoization
 *
 *
 * 1. Request Memoization은 Nextjs가 아닌 React의 기능이며, 컴포넌트 트리의 렌더링 시퀀스 안에서 발생한 fetch 요청은
 *    메모제이션 되어 같은 렌더링 시퀀스 안에서 같은 fetch 요청이 다시 발생할 경우, fetch를 다시 실행하지 않고 메모된 요청을 사용한다.
 *
 *    1-1. 같은 요청의 기준은 "url과 옵션이 동일한 fetch 요청"이다.
 *
 * 2. Request Memoization은 Server Side fetch 요청의 GET 메서드에만 적용된다.
 *
 * 3. 브라우저에서 이루어지는 fetch 요청과 서버 액션은 Request Memoization의 대상이 아니다.
 *
 *
 * + fetch API를 사용할 때 {cache : "no-store"}와 같은 옵션을 사용하면 빌드타임 html이 생성되지 않는다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/caching#request-memoization
 *
 * */
export default async function TestReq({ children }: { children: ReactNode }) {
  const data = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
  const url = data[0].url
  console.log('Layout call = ', url)
  return (
    <section className="p-10">
      <div className="flex">
        <ImageDiv url={url} description="Server Layout Fetch Image" />
        {children}
      </div>
      {/* Client Component */}
      <ClientFetchComponent />
    </section>
  )
}
