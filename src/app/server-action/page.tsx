import { useActionState } from 'react'

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
  return (
    <form action={createInvoice}>
      <label htmlFor="id">id</label>
      <input type="text" key="id" name="id" className="text-slate-900" /> <br />
      <label htmlFor="name">name</label>
      <input type="text" key="name" name="name" className="text-slate-900" /> <br />
      <label htmlFor="age">age</label>
      <input type="number" key="age" name="age" className="text-slate-900" /> <br />
      <label htmlFor="job">job</label>
      <input type="text" key="job" name="job" className="text-slate-900" /> <br />
      <button type="submit">Submit</button>
    </form>
  )
}
