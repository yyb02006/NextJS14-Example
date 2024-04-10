/**
 *
 * Routing => [Dynamic Routes]#Optional Catch-all Segments
 *
 *
 * 1. 다이나믹 라우트가 후속 세그먼트를 모두 포함하면서 현재 세그먼트까지 포함하고 싶다면 [[...folderName]]으로 사용하면 된다.
 *
 *    예를 들어, app/shop/[...slug]/page.tsx라는 경로가 있다면, /shop/clothes나 /shop/clothes/tops/t-shirts뿐만 아니라 /shop에도 대응할 수 있다.
 *
 * 2. 이 자식의 params는 {shop : ['clothes', 'tops', 't-shirts']}와 같은 식으로 전달되는데, 후속 세그먼트가 없을 경우 빈 객체도 반환할 수 있다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#optional-catch-all-segments
 *
 * */
export default function OptionalCatchAllPage({ params }: { params: { catch?: string[] } }) {
  return (
    <div>
      Hello OptionalCatchAllPage!
      <div>
        Current Optional Catch-all Segments ={' '}
        {params.catch
          ? params.catch.reduce((acc, param) => `${acc}/${param}`, '')
          : "Doesn't exist any segments"}
      </div>
    </div>
  )
}
