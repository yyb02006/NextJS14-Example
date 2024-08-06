import Link from 'next/link'
import { ReactNode } from 'react'

export default function DynamicRenderedLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <ul className="mb-4 flex gap-4">
        <li className={`border p-2 hover:bg-red-500`}>
          <Link
            href={
              '/caching/router-cache/dynamic-rendered'
            } /* prefetch={true} // 기본적으로 포함되어 있기 때문에 필요하지 않음 */
          >
            to Prefetching Page
          </Link>
        </li>
        <li className={`border p-2 hover:bg-red-500`}>
          <Link href={'/caching/router-cache/dynamic-rendered/none-prefetching'} prefetch={false}>
            to None Prefetching Page
          </Link>
        </li>
      </ul>
      <div>{children}</div>
    </section>
  )
}
