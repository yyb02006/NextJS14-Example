'use client'

import { useEffect, useState } from 'react'
import { ImageDiv } from '../../ImageDiv'

export default function RouterCacheHelloPage() {
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
      Hello RouterCacheHelloPage!
      <div className="flex">
        <ImageDiv url={url} description="this page rendered on client side" />
      </div>
    </section>
  )
}
