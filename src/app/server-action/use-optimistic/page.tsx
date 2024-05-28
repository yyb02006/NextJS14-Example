'use client'

import { useOptimistic } from 'react'

type Message = {
  message: string
}

/**
 *
 * Data Fetching => [Server Actions and Mutations]#Optimistic Update
 *
 *
 * 1. Optimistic Update란 서버에서 응답하기 전에 예상할 수 있는 UI를 렌더링하는 것을 말한다.
 *    SNS에서 좋아요 버튼을 클릭할 때, 응답을 기다리지 않고 아이콘이 활성화되는 것이 바로 낙관적 업데이트이다.
 *
 * 2. 리액트에서는 Optimistic Update의 로직을 추상화 하여 사용할 수 있도록 useOptimistic 훅을 제공하고 있다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#optimistic-updates
 *
 * */
export function Thread({ messages }: { messages: Message[] }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[], string>(
    messages,
    (state, newMessage) => [...state, { message: newMessage }],
  )
  const send = async (message: FormDataEntryValue | null) => {
    'use server'
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
