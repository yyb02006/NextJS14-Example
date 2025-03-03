import ImageDiv from '../ImageDiv'
import TimerButton from './_components/TimerButton'
import NoStoreCatImage from './_components/NoStoreCatImage'
import ForceCacheCatImage from './_components/ForceCacheCatImage'
import OnDemandRevalidateCatImage from './_components/OnDemandRevalidateCatImage'
import fetchImage from './fetchImage'

/**
 *
 * Caching => #Data Cache
 *
 *
 * 1. Data Cache는 서버 사이드에서의 fetch 요청이 데이터를 가져오면서 NextJS 내부의 Data Cache에 JSON형식으로 캐싱하고,
 *    이 후 URL, 파라미터, 메서드, 헤더가 동일한 요청이 반복될 때 캐시에서 데이터를 제공하는 캐싱 방법이다.
 *
 * 2. Data Cache는 요청의 동일성을 비교할 때 옵션의 여부는 따지지 않는다.
 *
 * 3. Request Memoization은 한 렌더링 시퀀스에서 같은 요청을 묶어서 한 번의 요청으로 처리하는 것을 말하며
 *    Data Cache는 렌더링 시퀀스에 상관없이 애플리케이션의 생명주기동안 반영구적인 캐시를 제공한다.
 *
 * 4. Request Memoization과 Data Cache는 서로 같이 작동할 수 있으며, 그렇게 될 경우 Data Cache에서 캐시된 응답을 한 번 제공하고,
 *    이 응답이 서버 렌더링 시 Request Memoization에 캐싱되어 모든 같은 요청에 대해 Request Memoization에서 응답하는 형태가 된다.
 *
 * 5. 옵션을 명시적으로 사용하지 않고 다이나믹 렌더링을 하지 않으면 'force-cache'가 기본값으로 할당되고, 다이나믹 렌더링을 한다면 'no-store'가 기본값으로 할당된다.
 *    그러나 새로고침 시 revalidate 주기나, no-store 옵션 등이 전파되는 모습이 확인되었고, 원인을 알 수 없다.
 *
 * 6. 웬만하면 명시적으로 캐싱 옵션을 주는 것을 추천.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/caching#data-cache
 *
 * */

/**
 *
 * Data Cache와 Time-based revalidation 옵션
 *
 * Time-based이기 때문에 아래의 캐시는 옵션에 쓰여진 시간이(in seconds) 지나게 되면 재검증된다.
 * 현재 해당 요청의 resolve 이후 요청된 fetch가 옵션을 가지고 있지 않다면 revalidate가 전파되는 현상이 발견된다.
 *
 */
export default async function DataCachePage() {
  const data = await fetchImage({ kind: 'cat', requestInit: { next: { revalidate: 10 } } })
  const url = data[0].url
  console.log('DataCache Fetch')
  return (
    <section className="p-10">
      <div>API URL : https://api.thecatapi.com/v1/images/search</div>
      <div className="flex gap-4">
        <ImageDiv url={url} description="Fetch Revalidated Every 10seconds" />
        <ForceCacheCatImage />
        <NoStoreCatImage />
        <OnDemandRevalidateCatImage />
      </div>
      <TimerButton />
    </section>
  )
}
