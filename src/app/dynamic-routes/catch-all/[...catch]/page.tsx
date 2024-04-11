/**
 *
 * Routing => [Dynamic Routes]#Catch-all Segments
 *
 *
 * 1. 다이나믹 라우트가 현재 세그먼트 하나가 아니라 후속 세그먼트를 모두 포함하고 싶으면 [...folderName]으로 사용하면 된다.
 *
 *    예를 들어, app/shop/[...slug]/page.tsx라는 경로가 있다면, /shop/clothes뿐만 아니라 /shop/clothes/tops/t-shirts에도 대응될 수 있다.
 *
 * 2. 이 자식의 params는 {shop : ['clothes', 'tops', 't-shirts']}와 같은 식으로 전달된다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense
 *
 * */
export default function CatchAllPage({ params }: { params: { catch: string[] } }) {
  return (
    <div>
      Hello CatchAllPage!
      <div>
        Current Catch-all Segments = {params.catch.reduce((acc, param) => `${acc}/${param}`, '')}
      </div>
    </div>
  )
}
