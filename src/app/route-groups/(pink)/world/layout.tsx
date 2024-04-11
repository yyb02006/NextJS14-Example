import { ReactNode } from 'react'

export default function HelloLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      this color is pink<div className="bg-pink-600">{children}</div>
    </section>
  )
}
