'use client'

import { useEffect, useState } from 'react'
import ImageDiv from '../../ImageDiv'

export default function NoneCachingPage() {
  const [url, setUrl] = useState('')
  useEffect(() => {
    const getCatImage = async () => {
      const data = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
      setUrl(data[0].url)
    }
    getCatImage()
    console.log('this image was fetched on browser')
  }, [])
  return (
    <section>
      <h1>Hello None-Caching Page!</h1>
      <div className="flex">
        <ImageDiv url={url} description="this page rendered on client side" />
      </div>
    </section>
  )
}
