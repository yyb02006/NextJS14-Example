import FetchPost from '#/components/fetch-post'
import { Suspense } from 'react'

export default function StreamingComponentsPage() {
  return (
    <section>
      Hello StreamingComponentsPage!
      <Suspense fallback={<p>loading post...</p>}>
        <FetchPost />
      </Suspense>
    </section>
  )
}
