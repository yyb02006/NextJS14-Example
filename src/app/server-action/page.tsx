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

interface LateBloomer {
  petalCount: number
  bloom: () => void
  declare: () => void
}

function createLateBloomer(): LateBloomer {
  const petalCount = Math.ceil(Math.random() * 12) + 1

  function bloom() {
    setTimeout(declare, 1000)
  }

  function declare() {
    console.log(`I am a beautiful flower with ${petalCount} petals!`)
  }

  return { petalCount, bloom, declare }
}

const flower = createLateBloomer()
flower.bloom()

export default function ServerActionPage() {
  async function createInvoice(formData: FormData) {
    'use server'
    const rawFormData = {
      id: formData.get('id'),
      name: formData.get('name'),
      age: formData.get('age'),
      job: formData.get('job'),
    }
    console.log(rawFormData)
  }
  async function updateUser(userId: number, formData: FormData) {
    'use server'
    console.log(formData.get('id'))
    console.log(userId)
  }
  async function logging() {
    'use server'
    console.log('non-form button was clicked')
  }
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
