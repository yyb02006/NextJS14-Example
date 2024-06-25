/**
 *
 * Routing => [Project Organization]#safe-colocation-by-default
 *
 *
 * 1. 라우트 경로 내에 page 파일이 없으면 해당 경로 세그먼트에 접근할 수 없다.
 *    따라서 app 폴더 아래에 components같은 파일을 만들어서 사용해도 page 파일만 만들지 않는다면 무방하다.
 *
 * 2. 반대로 page가 있는 경우에도 다른 파일을 서비스하는 일은 없기 때문에
 *    라우트 경로 안에서도 자유롭게 다른 이름의 파일을 작성해서 사용할 수 있다.
 *    단, 스페셜 파일과 이름 충돌이 있어서는 안된다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/colocation#safe-colocation-by-default
 *
 *
 *
 * Routing => [Project Organization]#private-folders
 *
 *
 * 1. 폴더앞에 "_"를 붙이면 해당 폴더 전체가 라우팅 시스템에 포함되지 않는다. app내에서 private한 파일을 사용하고 싶을 때 유용하다.
 *    예를 들어, app폴더 내에 components, lib, assets, font 폴더 등을 두고 싶을 때 사용할 수 있다.
 *
 * 2. 기본적으로는 src폴더도 지원하므로 어떻게 사용하든 상관없다. 개인적으로는 최대한 코드들을 분리하는 게 좋다고 생각.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/colocation#private-folders
 *
 * */
export default function PrivatesPage() {
  return <div>Hello PrivatesPage!</div>
}
