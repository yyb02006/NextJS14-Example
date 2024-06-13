import Image from 'next/image'
import { ImageDiv } from '../ImageDiv'

interface DogData {
  id: string
  url: string
  width: number
  height: number
}

const fetchCatImage = async () => {
  const data: DogData[] = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
  const url = data[0].url
  console.log('run fetch in component')
  return url
}

export default async function CatImage() {
  const url = await fetchCatImage()
  console.log('Component call = ', url)
  return <ImageDiv url={url} description="Server Component Fetch Image" />
}
