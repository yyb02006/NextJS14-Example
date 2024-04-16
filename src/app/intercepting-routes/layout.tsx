import { ReactNode } from 'react'

export default function InterceptingRoutesLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      Hello InterceptingRoutesLayout!<div>{children}</div>
    </section>
  )
}
