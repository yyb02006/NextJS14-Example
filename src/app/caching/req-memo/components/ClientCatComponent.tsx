'use client'

import { useEffect, useState } from 'react'
import { callFetch } from '../actions'
import ImageDiv from '../../ImageDiv'

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
      <ImageDiv url={url} description="Client Component Fetch Image" />
    </div>
  )
}

export default function ClientFetchComponent() {
  const [url, setUrl] = useState({ pageFetch: '', serverActionFetch: '' })
  useEffect(() => {
    const fetchCatImage = async () => {
      const data = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
      const dataFromServerAction = await callFetch()
      const [pageFetch, serverActionFetch] = [data[0].url, dataFromServerAction]
      setUrl({ pageFetch, serverActionFetch })
    }
    fetchCatImage()
  }, [])
  return (
    <div className="flex">
      <ImageDiv url={url.pageFetch} description="Client Page Fetch Image" />
      <ImageDiv url={url.serverActionFetch} description="Client Server Action Image" />
      <ClientCatImage />
    </div>
  )
}
