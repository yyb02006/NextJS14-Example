/**
 *
 * Routing => [Loading UI and Streaming]#Instant Loading State
 *
 *
 * 1. loading 스페셜 파일은 default export된 컴포넌트를 리액트의 서스펜스에 fallback으로 할당하여 렌더링한다.
 *
 * 2. 서스펜스를 직접 사용하는 방법도 사용 가능하다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#instant-loading-states
 *
 * */
export default function DashboardLoading() {
  return <div>Redirecting...</div>
}
