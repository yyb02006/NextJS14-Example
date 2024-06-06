import Image from 'next/image'
import { ReactNode } from 'react'

export default async function TestReq({ children }: { children: ReactNode }) {
  const data = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
  const url = data[0].url
  return (
    <section>
      <div className="relative h-[225px] w-[400px]">
        <Image alt="altImg" src={url} layout="fill" objectFit="cover" />
      </div>
      <span className="text-rose-400">Layout Fetch Image</span>
      {children}
    </section>
  )
}
