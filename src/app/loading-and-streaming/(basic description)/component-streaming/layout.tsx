import { ReactNode } from 'react'

export default function StreamingComponentsLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <h1>Hello StreamingComponentsLayout!</h1>
      {children}
    </section>
  )
}
