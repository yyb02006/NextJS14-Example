export default function ServerActionPage() {
  async function createInvoice(form: FormData) {
    'use server'
    const rawFormData = {
      id: form.get('id'),
      name: form.get('name'),
      age: form.get('age'),
      job: form.get('job'),
    }
    console.log(rawFormData)
  }
  return (
    <form action={createInvoice}>
      <input type="text" key={'id'} />
      <input type="text" key={'name'} />
      <input type="number" key={'age'} />
      <input type="text" key={'job'} />
    </form>
  )
}
