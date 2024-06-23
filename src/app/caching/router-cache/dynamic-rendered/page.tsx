import { ImageDiv } from '../../ImageDiv'

export const dynamic = 'force-dynamic'

export default async function PreFetchingPage() {
  const data = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
  const url = data[0].url
  console.log('this image was fetched on server')
  return (
    <section>
      Hello Dynamic-Rendered Page!
      <div className="flex">
        <ImageDiv url={url} description="this page invalidating 5 minutes later" />
      </div>
    </section>
  )
}
