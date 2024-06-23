import { ImageDiv } from '#/app/caching/ImageDiv'

export const dynamic = 'force-dynamic'

export default async function NonePreFetchingPage() {
  const data = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
  const url = data[0].url
  console.log('this image was fetched on server')
  return (
    <section>
      Hello Dynamic-Rendered Page!
      <div className="flex">
        <ImageDiv url={url} description="this page invalidating 30 seconds later" />
      </div>
    </section>
  )
}
