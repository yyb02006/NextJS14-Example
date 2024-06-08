import Image from 'next/image'

interface DogData {
  id: string
  url: string
  width: number
  height: number
}

const fetchCatImage = async () => {
  const data: DogData[] = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
  const url = data[0].url
  return url
}

const CatImage = async () => {
  const url = await fetchCatImage()
  return (
    <div>
      <div className="relative h-[225px] w-[400px]">
        <Image alt="altImg" src={url} layout="fill" objectFit="cover" />
      </div>
      <span className="text-rose-400">Server Component Fetch Image</span>
    </div>
  )
}

export default async function ReqMemoPage() {
  const url = await fetchCatImage()
  return (
    <section className="flex">
      <div>
        <div className="relative h-[225px] w-[400px]">
          <Image alt="altImg" src={url} layout="fill" objectFit="cover" />
        </div>
        <span className="text-rose-400">Page Fetch Image</span>
      </div>
      <CatImage />
    </section>
  )
}
