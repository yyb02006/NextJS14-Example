import ImageDiv from '../../ImageDiv'
import fetchImage from '../fetchImage'

/**
 *
 * Data Cache와 force-cache 옵션
 *
 * force-cache이므로 첫 번째 요청이 SET시킨 데이터를 반영구적으로 캐시하고, 새로고침 시 계속 같은 강아지 사진이 출력됨을 알 수 있다.
 *
 */
export default async function ForceCacheCatImage() {
  const data = await fetchImage({ kind: 'dog', requestInit: { cache: 'force-cache' } })
  const url = data[0].url
  console.log('ForceCache Fetch')
  return <ImageDiv url={url} description="Force-Cached Fetch" />
}
