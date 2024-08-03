import ImageDiv from '../../ImageDiv'
import fetchImage from '../fetchImage'
/**
 *
 * Data Cache와 On-demand revalidation 옵션
 *
 * on-demand이기 때문에 아래의 캐시를 재검증하기 위해서는 <라우트 핸들러>나 <서버액션>에서 revalidateTag 함수나 revalidatePath 함수를 호출해야 한다.
 *
 */
export default async function OnDemandRevalidateCatImage() {
  const data = await fetchImage({
    kind: 'dog',
    requestInit: { next: { tags: ['dog'] }, cache: 'force-cache' },
  })
  const url = data[0].url
  console.log('OnDemandRevalidate Fetch')
  return <ImageDiv url={url} description="On-Demand Revalidate Fetch" />
}
