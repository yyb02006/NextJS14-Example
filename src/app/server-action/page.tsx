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
 * 1. 비동기 함수 내부에서 'use server' 키워드를 사용하면 클라이언트 컴포넌트더라도 서버에서만 코드가 작동하도록 만들 수 있다.
 *    이를 '서버액션'이라고 한다.
 *
 * 2. 보통의 경우 actions 폴더에 서버액션을 따로 모아서 관리하는 방법을 따른다.
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
      <form action={createInvoice}>
        {formFieldAttributes.map(({ type, key, name }) => {
          return FormInput({ type, key, name })
        })}
        <button type="submit">Submit</button>
      </form>
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
