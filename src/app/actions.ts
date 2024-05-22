'use server'

export async function createInvoice(formData: FormData) {
  const rawFormData = {
    id: formData.get('id'),
    name: formData.get('name'),
    age: formData.get('age'),
    job: formData.get('job'),
  }
  console.log(rawFormData)
}

export async function updateUser(userId: number, formData: FormData) {
  'use server'
  console.log(formData.get('id'))
  console.log(userId)
}

export async function logging() {
  'use server'
  console.log('non-form button was clicked')
}
