import Image from 'next/image'
import CatImage from './ServerCatComponent'
import { ImageDiv } from './ImageDiv'

interface DogData {
  id: string
  url: string
  width: number
  height: number
}

// no-store 캐시 상태에서는 빌드타임 html도 생성되지 않음
const fetchCatImage = async () => {
  const data: DogData[] = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
  const url = data[0].url
  console.log('run fetch in page')
  return url
}

// Image 컴포넌트가 있는 경우 Component Call 로그가 출력되지 않는 현상 발견
// no-store fetch일 경우 Component Call 로그는 출력되지 않고, default fecth일 경우 모든 Call 로그가 두 번 출력되는 현상 발견
// catImage 컴포넌트를 모듈로 사용하고, fetchCatImage 함수를 no-store로 사용하면 모든 Call 로그가 한 번 출려되는 현상 발견
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

export default async function ReqMemoPage() {
  const url = await fetchCatImage()
  console.log('Page call = ', url)
  return (
    <section className="flex">
      <ImageDiv url={url} description="Server Page Fetch Image" />
      <CatImage />
    </section>
  )
}
