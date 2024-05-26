import { createInvoice, logging, updateUser } from '../actions'

interface FormType {
  type: 'text' | 'number'
  name: string
  key: string
}

const FormInput = ({
  type,
  name,
  key = name,
}: {
  type: 'text' | 'number'
  name: string
  key?: string
}) => {
  return (
    <div key={key}>
      <label htmlFor={key}>{name}</label>
      <input type={type} key={key} name={name} className="text-slate-900" />
    </div>
  )
}

/**
 *
 * Data Fetching => [Server Actions and Mutations]
 *
 *
 * 1. 비동기 함수 내부에서 'use server' 키워드를 사용하면 클라이언트 컴포넌트더라도 해당 함수가 서버에서만 작동하도록 만들 수 있다. 이를 '서버액션'이라고 한다.
 *
 * 2. api 핸들러에서 처리할 수 있는 일을 컴포넌트에서 처리할 수 있게 되지만 코드는 여전히 컴포넌트 안에 있기 때문에 인증, 보안에 유의해야한다.
 *
 * 3. 보통의 경우 actions 폴더에 서버액션을 따로 모아서 관리하는 폴더구조를 따른다.
 *
 *
 * 4. 주로 FormData의 action 어트리뷰트에 서버액션을 넣고, 서버액션에서 FormData 파라미터로 전달받은 데이터를 참조해
 *    pending, validation, error handling 등을 처리하는 방식으로 사용한다.
 *
 * 5. Form이 아닌 경우에도 onClick 어트리뷰트의 이벤트 핸들러에 서버액션을 호출할 수 있고, useEffect 훅 내부에서도 같은 방법으로 호출할 수 있다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 *
 */
export default function ServerActionPage() {
  const updateUserWithId = updateUser.bind(null, 4)
  const formFieldAttributes: FormType[] = [
    { type: 'text', key: 'id', name: 'id' },
    { type: 'text', key: 'name', name: 'name' },
    { type: 'number', key: 'age', name: 'age' },
    { type: 'text', key: 'job', name: 'job' },
  ]
  return (
    <>
      {/*  Form Element에서의 서버 액션 사용 */}
      <form action={createInvoice}>
        {formFieldAttributes.map(({ type, key, name }) => {
          return FormInput({ type, key, name })
        })}
        <button type="submit">Submit</button>
      </form>
      {/* Non-Form Element에서의 서버 액션 사용 */}
      <button
        onClick={async () => {
          await logging()
          console.log('server-action with non-form button was succeed')
        }}
      >
        Non-form Button
      </button>
    </>
  )
}
