'use client'

import { useEffect } from 'react'

/**
 *
 * Routing => [Error Handling]#Handling Errors in Root Layouts
 *
 *
 * 1. 어떤 error파일도 루트 레이아웃을 포함할 수 없기 때문에, 루트 레이아웃의 에러는 일반적인 error파일로 잡아낼 수 없다.
 *
 * 2. 1번과 같은 이유 때문에 nextjs에서는 루트 레이웃의 에러를 핸들링할 수 있는 global-error 스페셜 파일을 제공한다.
 *
 * 3. global-error의 컴포넌트는 <html>, <body>태그를 포함하고 있는 루트 레이아웃을 대체해야하기 때문에 자체적으로 <html>, <body> 태그를 정의해야한다.
 *
 * 4. global-error 파일은 프로덕션 환경에서만 활성화되고, 개발 환경에서는 오류 오버레이를 대신 보여준다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
 *
 * */
export default function GlobalError({
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
    <html>
      <body>
        Something Went Wrong in Global!
        <button type="button" onClick={() => reset()} className="bg-amber-600 px-2">
          Try agin
        </button>
      </body>
    </html>
  )
}
