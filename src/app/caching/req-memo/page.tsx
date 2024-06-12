import Image from 'next/image'
import CatImage from './ServerCatComponent'
import { ImageDiv } from './ImageDiv'

interface DogData {
  id: string
  url: string
  width: number
  height: number
}

const fetchCatImage = async () => {
  const data: DogData[] = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
  const url = data[0].url
  console.log('run fetch in page')
  return url
}

// 이유는 알 수 없지만 아래 비동기 컴포넌트는 빌드시에 실행되지 않는다.
/* const CatImage = async () => {
  const url = await fetchCatImage()
  console.log('Component call = ', url)
  return (
    <div className="border border-sky-600">
      <div className="relative h-[225px] w-[400px]">
        <Image alt="altImg" src={url} layout="fill" objectFit="cover" />
      </div>
      <span className="text-rose-400">Server Component Fetch Image</span>
    </div>
  )
} */

/**
 *
 * Caching => #Request Memoization
 *
 *
 * 1. 만약 한 렌더링 시퀀스 내부의 여러 개의 동일한 url을 가진 fetch 요청 중
 *    특정 fetch에서 cache를 옵트아웃하는 옵션을 사용한다면, 해당 fetch 요청을 기준으로 request memoization도 다시 요청을 캐시한다.
 *
 * 2. 아래와 같은 multipleFetchCall 함수에서 data1과 data2는 같지만 data3은 새로운 데이터를 요청했으므로 data4는 data3에서 캐시된 데이터를 사용한다.
 *
 * 3. nextjs14에서 빌드나 렌더링 시 파일 컨벤션들의 실행 순서는 page.tsx가 layout.tsx보다 먼저이다. 아마도 내부적으로 모듈로 들어오기 때문에 먼저 실행되는 듯.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/caching#request-memoization
 *
 * */
const multipleFetchCall = async () => {
  // 첫 번째 fetch 요청 시 캐시된 데이터가 없으므로
  // Miss => Set
  const data1 = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
  // 첫 번째 fetch 요청에서 데이터가 캐시되었으므로
  // Hit
  const data2 = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
  // no-store 옵션으로 인해 캐시된 데이터를 사용하지 않고 새로운 데이터 요청
  // Miss => Set
  const data3 = await (
    await fetch('https://api.thecatapi.com/v1/images/search', { cache: 'no-store' })
  ).json()
  // 위 fetch 요청으로 인해 새로운 데이터가 캐시되었으므로
  // Hit
  const data4 = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
  console.log('data1 = ', data1[0].url)
  console.log('data2 = ', data2[0].url)
  console.log('data3 = ', data3[0].url)
  console.log('data4 = ', data4[0].url)
}

export default async function ReqMemoPage() {
  await multipleFetchCall()
  const url = await fetchCatImage()
  console.log('Page call = ', url)
  return (
    <section className="flex">
      <ImageDiv url={url} description="Server Page Fetch Image" />
      <CatImage />
    </section>
  )
}
