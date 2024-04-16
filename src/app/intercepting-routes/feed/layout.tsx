import { ReactNode } from 'react'

export default function FeedLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      Hello FeedLayout!<div>{children}</div>
    </section>
  )
}
