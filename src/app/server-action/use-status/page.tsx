import { SubmitButton } from '#/components/Buttons'

export default function UseStatusPage() {
  async function createInvoice(formData: FormData) {
    'use server'
    const rawFormData = {
      name: formData.get('name'),
    }
    console.log(rawFormData)
  }
  return (
    <form action={createInvoice}>
      <input type="text" name="name" />
      <SubmitButton />
    </form>
  )
}
