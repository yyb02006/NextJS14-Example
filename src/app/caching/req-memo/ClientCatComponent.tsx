'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const ClientCatImage = () => {
  const [url, setUrl] = useState('')
  useEffect(() => {
    const fetchCatImage = async () => {
      const data = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
      const url = data[0].url
      setUrl(url)
    }
    fetchCatImage()
  }, [])
  return (
    <div>
      <div className="relative flex h-[225px] w-[400px] items-center justify-center">
        {url ? (
          <Image alt="altImg" src={url} layout="fill" objectFit="cover" />
        ) : (
          'loading image...'
        )}
      </div>
      <span className="text-rose-400">Client Component Fetch Image</span>
    </div>
  )
}

export default function ClientFetchComponent() {
  const [url, setUrl] = useState('')
  useEffect(() => {
    const fetchCatImage = async () => {
      const data = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
      const url = data[0].url
      setUrl(url)
    }
    fetchCatImage()
  }, [])
  return (
    <div className="flex">
      <div>
        <div className="relative flex h-[225px] w-[400px] items-center justify-center">
          {url ? (
            <Image alt="altImg" src={url} layout="fill" objectFit="cover" />
          ) : (
            'loading image...'
          )}
        </div>
        <span className="text-rose-400">Client Page Fetch Image</span>
      </div>
      <ClientCatImage />
    </div>
  )
}
