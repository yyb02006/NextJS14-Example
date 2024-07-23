import ImageDiv from '#/app/caching/ImageDiv'

export const dynamic = 'force-dynamic'

/**
 *
 * force-dynamic 옵션으로 다이나믹 렌더링되어 서버가 매번 fetch를 실행해야 하지만,
 * Router-Cache에 의해 브라우저에서 일정 시간동안 캐싱되기 때문에 그 시간동안 서버측 fetch 요청은 일어나지 않는다.
 * 이 페이지는 prefetch방식이 true이므로 5분.
 *
 * */
export default async function NonePreFetchingPage() {
  const data = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
  const url = data[0].url
  console.log('this image was fetched on server')
  return (
    <section>
      <h1>Hello None-Prefetching Page!</h1>
      <div className="flex">
        <ImageDiv url={url} description="this page invalidating 30 seconds later" />
      </div>
    </section>
  )
}
