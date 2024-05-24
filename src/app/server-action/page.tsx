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
