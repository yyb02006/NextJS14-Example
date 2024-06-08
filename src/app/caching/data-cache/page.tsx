import Image from 'next/image'

const CatImageDiffUrl = async () => {
  const data = await (
    await fetch('https://api.thedogapi.com/v1/images/search', { cache: 'no-store' })
  ).json()
  const url = data[0].url
  return (
    <div>
      <div className="relative h-[225px] w-[400px]">
        <Image alt="altImg" src={url} layout="fill" objectFit="cover" />
      </div>
      <span className="text-rose-400">No-Store Fetch(same api url)</span>
    </div>
  )
}

const CatImageSameUrl = async () => {
  const data = await (
    await fetch('https://api.thecatapi.com/v1/images/search', { cache: 'force-cache' })
  ).json()
  const url = data[0].url
  return (
    <div>
      <div className="relative h-[225px] w-[400px]">
        <Image alt="altImg" src={url} layout="fill" objectFit="cover" />
      </div>
      <span className="text-rose-400">Force Cached Fetch(same api url)</span>
    </div>
  )
}

export default async function DataCachePage() {
  const data = await (
    await fetch('https://api.thecatapi.com/v1/images/search', {
      next: { revalidate: 10 },
    })
  ).json()
  const url = data[0].url
  return (
    <section className="p-10">
      <div>
        <div className="relative h-[225px] w-[400px]">
          <Image alt="altImg" src={url} layout="fill" objectFit="cover" />
        </div>
        <span className="text-rose-400">Revalidate every 10seconds Fetch</span>
      </div>
      <CatImageSameUrl />
      <CatImageDiffUrl />
    </section>
  )
}
