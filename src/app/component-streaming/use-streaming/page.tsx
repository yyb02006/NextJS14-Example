import FetchComment from '#/components/fetch-comment'
import FetchPost from '#/components/fetch-post'
import { Suspense } from 'react'

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
