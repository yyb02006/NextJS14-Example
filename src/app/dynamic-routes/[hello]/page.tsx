/**
 *
 * File Conventions => [DynamicParams]#DynamicParams
 *
 *
 * 1. dynamicParams config으로 사용자가 미리 생성되지 않은 다이나믹 라우트에 방문했을 때의 동작을 결정한다.
 *
 * 2. boolean값을 요구하며, 각 값에 대한 구체적 동작은 아래와 같다.
 *
 *    true(default) : Streaming방식으로 새로운 페이지를 생성한다.
 *
 *    false : 404 Error 페이지를 반환한다.
 *
 * 3. 같은 페이지 내의 dynamic config이 'error'나 'force-static'으로 설정되어 있을 경우 기본값은 false가 된다.
 *
 *
 * ref : https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
 *
 * */
export const dynamicParams = false

const fetchParams = () => {
  return new Promise<{ success: boolean; params: string[] }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true, params: ['n', 'e', 'x', 't'] })
    }, 3000)
  })
}

/**
 *
 * Routing => [Dynamic Routes]#Generating Static Params
 *
 *
 * 1. 다이나믹 라우트가 빌드타임에 정적파일로 생성되게 해주는 함수. 페이지 라우터의 getStaticPaths와 비슷하다.
 *
 * 2. 빌드타임에 api를 요청해서 받은 데이터를 기반으로 다이나믹 라우트의 정적 파일을 생성해준다.
 *
 * 3. 빌드타임의 fetch는 메모라이즈되기 때문에 중복되는 요청에 대해서 한 번만 요청한다.
 *
 * 4. 개발환경에서는 페이지 이동시마다 호출되고, ISR 시에는 다시 호출되지 않는다.
 *
 * 5. option.params 프로퍼티로 부모의 파라미터가 들어온다.
 *
 * 6. 기본적으로 { folderName : string }[]으로된 객체 배열을 리턴해야한다. 바리에이션에 따라 value는 string에서 다르게 바뀔 수 있다.
 *    부모도 다이나믹 라우트일 때는 { parentFolderName: string, folderName: string }[]와 같은 방식으로도 사용 가능하다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params
 * ref(generatingStaticParams) : https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 *
 * */
export async function generateStaticParams() {
  const response = await fetchParams()
  return response.params.map((param) => ({ hello: param }))
}

/**
 *
 * Routing => [Dynamic Routes]
 *
 *
 * 1. 페이지 라우터에 존재하던 그 다이나믹 라우트가 맞다! 게시판 글 처럼 미리 이름을 알 수 없는 세그먼트에 대해 설정하는 라우트이다.
 *
 * 2. 쉽게 말해 app/blog/[slug]/page.js라는 라우트에 blog/a, blog/b, blog/c로 전부 접근할 수 있다.
 *
 * 3. [folderName] 형식을 그대로 사용하면 된다.
 *
 * 4. 다이나믹 라우트의 각 세그먼트는 params 라는 프로퍼티가 전달되며 { folderName : '실제 세그먼트' }식으로 전달된다.
 *    layout, page, route파일에 전달될 수 있으며, generateMetadata함수에도 전달된다
 * 5. cath-all, optional-catch-all과 같은 바리에이션이 있다. generateStaticParams라는 정적 생성을 지원하는 함수도 있다.
 *
 * 6. generateStaticParams로 미리 생성되지 않는 다이나믹 라우트에 대해선 SSR방식으로 렌더링된다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 *
 * */
export default function DynamicHelloPage({ params }: { params: { hello: string } }) {
  return (
    <div>
      Hello DynamicHelloPage!<div>Current Hello Params = {params.hello}</div>
    </div>
  )
}
