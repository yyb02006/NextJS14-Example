import { ImageDiv } from '../ImageDiv'

export default async function RouterCache() {
  const data = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
  const url = data[0].url
  return (
    <div className="p-10">
      <div>Hello RouterCachePage!</div>
      <div className="flex">
        <ImageDiv url={url} description="Router Cache Cat Image" />
      </div>
    </div>
  )
}
