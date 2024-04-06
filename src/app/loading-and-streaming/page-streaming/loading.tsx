/**
 *
 * Routing => [Loading UI and Streaming]#instant-loading-states
 *
 *
 * 1. 해당 파일이 실제 리턴하는 컴포넌트 구조는 아래와 같다.
 *
 *    <Suspense fallback={<div>HTML Stream Loading...</div>}>
 *      <Page />
 *    </Suspense>
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#instant-loading-states
 *
 */
export default function PageStreamingLoading() {
  return <div>HTML Stream Loading...</div>
}
