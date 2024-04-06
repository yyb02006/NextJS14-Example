import { ReactNode } from 'react'

export default function ErrorHandlingLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      Hello ErrorHandlingLayout!<div>{children}</div>
    </section>
  )
}
