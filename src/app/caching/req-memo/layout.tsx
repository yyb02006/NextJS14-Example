import Image from 'next/image'
import { ReactNode } from 'react'
import ClientFetchComponent from './ClientCatComponent'

export default async function TestReq({ children }: { children: ReactNode }) {
  const data = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
  const url = data[0].url
  return (
    <section className="p-10">
      <div className="flex">
        <div>
          <div className="relative h-[225px] w-[400px]">
            <Image alt="altImg" src={url} layout="fill" objectFit="cover" />
          </div>
          <span className="text-rose-400">Layout Fetch Image</span>
        </div>
        {children}
      </div>
      <ClientFetchComponent />
    </section>
  )
}
