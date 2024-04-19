import { ReactNode } from 'react'

export default function FeedWithSlotLayout({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <section>
      {children}
      {modal}
    </section>
  )
}
