import Link from 'next/link'
import { ReactNode } from 'react'

export default async function TestReq({ children }: { children: ReactNode }) {
  return (
    <section className="p-10">
      <ul className="mb-4 flex gap-4">
        <li className="border p-2 hover:bg-red-500">
          <Link href={'/caching/router-cache'}>to Server Side Rendered Page</Link>
        </li>
        <li className="border p-2 hover:bg-red-500">
          <Link href={'/caching/router-cache/hello'}>to Client Side Rendered Page</Link>
        </li>
        <li className="border p-2 hover:bg-red-500">
          <Link href={'/caching/router-cache/world'}>to Dynamic Renderd Page Page</Link>
        </li>
      </ul>
      <div>{children}</div>
    </section>
  )
}
