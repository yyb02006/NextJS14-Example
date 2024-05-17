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
  const formFieldAttributes: FormType[] = [
    { type: 'text', key: 'id', name: 'id' },
    { type: 'text', key: 'name', name: 'name' },
    { type: 'number', key: 'age', name: 'age' },
    { type: 'text', key: 'job', name: 'job' },
  ]
  return (
    <form action={createInvoice}>
      {formFieldAttributes.map(({ type, key, name }) => {
        return FormInput({ type, key, name })
      })}
      <button type="submit">Submit</button>
    </form>
  )
}
