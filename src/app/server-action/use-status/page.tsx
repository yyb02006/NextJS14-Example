import { SubmitButton } from '#/components/Buttons'

/**
 *
 * Data Fetching => [Server Actions and Mutations]#Pending States
 *
 *
 * 1. useFormStatus 훅을 사용해 Pending 상태를 따로 구현하지 않고 사용할 수 있다.
 *    Buttons 컴포넌트 참고
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#pending-states
 *
 */
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
