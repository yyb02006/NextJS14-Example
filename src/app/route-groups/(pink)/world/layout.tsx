import { ReactNode } from 'react'

export default function WorldLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      this color is pink<div className="bg-pink-600">{children}</div>
    </div>
  )
}
