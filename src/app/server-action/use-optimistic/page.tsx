'use client'

import { useOptimistic } from 'react'

type Message = {
  message: string
}

export function Thread({ messages }: { messages: Message[] }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[], string>(
    messages,
    (state, newMessage) => [...state, { message: newMessage }],
  )
  const send = (message: FormDataEntryValue | null) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(message)
      }, 1000)
    })
  }
  return (
    <div>
      {optimisticMessages.map((m, k) => (
        <div key={k}>{m.message}</div>
      ))}
      <form
        action={async (formData: FormData) => {
          const message = formData.get('message')
          if (typeof message !== 'string') return
          addOptimisticMessage(message)
          await send(message)
        }}
      >
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
