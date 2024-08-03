import ImageDiv from '../../ImageDiv'
import fetchImage from '../fetchImage'

/**
 *
 * Data Cache와 no-store 옵션
 *
 * no-store이므로 Data Cache는 매번 SKIP이며 매 요청을 새롭게 보낸다. 새로고침 시 계속 다른 고양이 사진이 출력됨을 알 수 있다.
 * 다만 여기서 no-store옵션을 주게 되면 이후 실행되는 fetch요청 또한 no-store 옵션을 기본값으로 가지게 되는 소위 말해 '전파 현상'이 발생한다.
 * 이것이 원래의 동작인지, 뭔가 이상이 있는 것인지는 현재로서는 불명.
 *
 */
export default async function NoStoreCatImage() {
  const data = await fetchImage({ kind: 'cat', requestInit: { cache: 'no-store' } })
  const url = data[0].url
  console.log('NoStore Fetch')
  return <ImageDiv url={url} description="No-Store Fetch" />
}
