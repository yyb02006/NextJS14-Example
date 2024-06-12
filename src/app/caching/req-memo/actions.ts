'use server'

/**
 *
 * Caching => #Request Memoization
 *
 *
 * 서버 액션은 기본적으로 캐싱을 하지 않기 때문에 서버 사이드에서 돌아가도 Request Memoization가 발생하지 않는다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/caching#request-memoization
 *
 * */
export async function callFetch() {
  const data = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
  const url = data[0].url
  return url
}
