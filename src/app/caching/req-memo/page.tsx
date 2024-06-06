import Image from 'next/image'

interface DogData {
  id: string
  url: string
  width: number
  height: number
}

export default async function ReqMemoPage() {
  const data: DogData[] = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
  const url = data[0].url
  console.log('url = ', data[0].url)
  return (
    <section>
      <div className="relative h-[225px] w-[400px]">
        <Image alt="altImg" src={url} layout="fill" objectFit="cover" />
      </div>
      <span className="text-rose-400">Page Fetch Image</span>
    </section>
  )
}
