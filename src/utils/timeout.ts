type ResolveProps = Record<string, string | number>
interface Result {
  success: boolean
}

/*
 *
 * Record 유틸리티 타입이나 {[key:string]:string | number}과 같은 타입들을 {success: boolean}과 같은 타입과 교차하면
 * success 프로퍼티 자체도 string | number 타입에 걸리게 되기 때문에 success를 넣으면 타입 에러가 일어난다.
 * 그러나 success를 안 넣어도 success: boolean 타입에서 에러가 일어나기 때문에 아무것도 못하는 타입 충돌이 발생한다.
 *
 * 저런 교차타입은 타입스크립트에서 never 타입조차도 할당하지 않기 때문에 그냥 사용할 수 없는 상태가 된다.
 * 그래서 아래와 같은 함수에서 위의 설명과 같은 타입에러가 발생하게 된다.
 *
 * const timeout = ({ resolveProps }: { resolveProps: ResolveProps }) =>
 * new Promise<Result & ResolveProps>((resolve) => {
 * setTimeout(() => {
 * resolve({ success: false, ...resolveProps }) // success 프로퍼티 타입 에러 발생
 * }, 3000)
 * })
 *
 * 아래의 함수처럼 사용하면 완-벽
 *
 * const testfuncc = <T extends ResolveProps>(indexSignature: T) => {
 * return { success: true, ...indexSignature }
 * }
 *
 * */

/**
 *
 * 일정 시간 후에 주어진 프로퍼티와 함께 success: false를 반환하는 Promise를 생성하는 함수
 *
 * @template T - 주어진 프로퍼티의 타입
 * @param {Object} params - 함수의 매개변수를 포함하는 객체
 * @param {boolean} params.success - 결과에 포함될 성공 여부를 나타내는 값
 * @param {T} params.resolveProps - 결과에 포함될 추가 프로퍼티들을 가진 객체
 * @returns {Promise<Result & T>} - 주어진 프로퍼티들과 함께 success: false를 포함하는 객체를 resolve하는 Promise를 반환
 *
 * @example
 *
 * timeout({ success: false, resolveProps: { message: 'Operation completed' } }).then((result) => {
 *   console.log(result.success) // false
 *   console.log(result.message) // "Operation completed"
 * })
 *
 * */
export const timeout = <T extends ResolveProps>({
  success,
  resolveProps,
}: {
  success: boolean
  resolveProps?: T
}): Promise<Result & T> => {
  return new Promise<Result & T>((resolve) => {
    setTimeout(() => {
      resolve({ success, ...resolveProps } as Result & T)
    }, 3000)
  })
}
