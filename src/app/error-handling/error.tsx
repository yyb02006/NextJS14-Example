'use client'

import { useEffect } from 'react'

/**
 *
 * Routing => [Error Handling]
 *
 *
 * 1. error 스페셜 파일은 런타임 에러를 처리하며, 때문에 클라이언트 사이드에서 작동한다.
 *
 * 2. 각 컴포넌트에서 에러가 발생하면 해당 에러는 가장 가까운 상위 error파일에 프로퍼티 전달된다.
 *
 * 3. error 스페셜 파일은 그 자체로 컴포넌트 하이어라키에서 사용되지 않고 ErrorBoundary 리액트 컴포넌트를 생성한다.
 *    error 스페셜 파일에서 내보낸 컴포넌트는 Error Boundary 컴포넌트의 fallback 컴포넌트로 사용된다.
 *    error 스페셜 파일은 실제로 아래와 같은 리액트 컴포넌트 계층을 갖는다.
 *
 *    <layout>
 *      <Error fallback={<Error />}>
 *        <Page />
 *      </Error>
 *    </layout>
 *
 * 4. 위에서 알 수 있듯이, Error컴포넌트는 직접적으로 컴포넌트 계층에 포함되지 않기 때문에 자신이 클라이언트 컴포넌트여도
 *    하위 파일들이 서버, 클라이언트 컴포넌트가 되는지에 대해 영향을 주지 않는다.
 *
 * 5. error 프로퍼티는 에러에 대한 내용을 가지고있다.
 *    아래의 코드에서는, page파일에서 'Some critical errors have occurred!'에러를 발생시키고 있기 때문에, 해당에러가 출력된다.
 *
 * 6. reset 프로퍼티는 리렌더링 시킬 수 있는 함수인데, 리렌더링의 범위는 ErrorBoundary 컴포넌트의 자손 컴포넌트들로 제한된다.
 *
 * 7. 서버 컴포넌트 내에서 오류가 발생하면 민감한 정보를 제거한 후 message와 digest 속성만 포함된 에러 객체가 전달된다.
 *    message 속성에는 오류에 대한 일반 메세지가 포함되며, digest 속성에는 서버 측 로그와의 일치를 확인할 수 있는 에러 해시가 포함된다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/error-handling
 *
 * */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <div>
      Something Went Wrong!
      <button type="button" onClick={() => reset()} className="bg-amber-600 px-2">
        Try agin
      </button>
    </div>
  )
}
