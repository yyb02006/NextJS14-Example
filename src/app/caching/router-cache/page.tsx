import { ImageDiv } from '../ImageDiv'

/**
 *
 * Caching => #Router Cache
 *
 *
 * 1. Router Cache는 클라이언트가 Full Route Cache에 요청한 것을 브라우저에서 다시 캐싱하여
 *    재 요청 시 서버에 다시 연결하지 않고 클라이언트 캐시에서 페이지를 꺼내 사용할 수 있도록 한다.
 *
 * 2. Router Cache는 기본적으로 클라이언트에서 작동하는 캐싱 메모리이기 때문에 서버와는 상관이 없다.
 *
 * 3. Dynamic Rendering으로 인해 Full Route Cahce가 작동하지 않을 때도
 *    브라우저에서 서버사이드가 렌더링한 페이지를 받는 순간 Router Cache는 작동한다.
 *
 * 4. Router Cache를 작동하지 않게 하는 방법은 없고, refresh나 Hard Navigating으로 유저의 세션이 종료되면 캐시도 초기화된다.
 *
 * 5. 유저의 세션이 종료되지 않은 상태에서 Router Cache를 무력화 되는 경우는 아래와 같다.
 *
 *    1. 각 경로의 캐시가 유지 시간에 따라 자동으로 무효화
 *
 *       경로가 프리페치된 방식이 prefetch={null} 이거나 설정되지 않았다면 30초마다 무효화되고,
 *       경로가 프리페치된 방식이 prefetch={true} 이거나 router.prefetch 메서드를 사용했을 경우 5분마다 무효화된다.
 *
 *    2. Server Action에서 revalidatePath 또는 revalidateTag 함수를 사용하여 무효화, cookie.set 이나 cookie.delete 호출
 *
 *    3. router.refresh 호출
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/caching#router-cache
 *
 * */
export default async function RouterCache() {
  const data = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
  const url = data[0].url
  return (
    <div>
      <div>Hello RouterCachePage!</div>
      <div className="flex">
        <ImageDiv url={url} description="Router Cache Cat Image" />
      </div>
    </div>
  )
}
