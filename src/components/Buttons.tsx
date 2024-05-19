'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending, action, data, method } = useFormStatus()
  console.log('pending = ', pending)
  console.log('action = ', action)
  console.log('data = ', data)
  console.log('method = ', method)
  return <button disabled={pending}>Submit</button>
}
