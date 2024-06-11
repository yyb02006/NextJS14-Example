import Image from 'next/image'

interface DogData {
  id: string
  url: string
  width: number
  height: number
}

const fetchCatImage = async () => {
  const data: DogData[] = await (
    await fetch('https://api.thecatapi.com/v1/images/search', { cache: 'no-store' })
  ).json()
  const url = data[0].url
  console.log('run fetch in page')
  return url
}

export default async function CatImage() {
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
}
