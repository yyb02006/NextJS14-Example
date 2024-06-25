'use server'

export default async function createInvoice(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
  }
  console.log(rawFormData)
}
