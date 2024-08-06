/**
 *
 * jest가 모킹할 수 없는 함수를 컴포넌트 내에서 모킹해주는 함수
 *
 * @template T - 주어진 프로퍼티의 타입
 * @param {T} param - 로그에 담길 정보를 가진 파라미터
 *
 * @example
 *
 * // test 환경인 경우 예제
 *
 * mockFunction('hello world!') // log : 'call with ', 'hello world!'
 *
 * // test 환경이 아닌 경우 예제
 *
 * mockFunction('hello world!') // error : 'not test environment'
 *
 */
export const mockFunction = <T>(param: T) => {
  const isTest = process.env.NODE_ENV === 'test'
  if (isTest) {
    console.log('call with ', param)
  } else {
    throw new Error('not test environment')
  }
}
