import Link from 'next/link'
import { ReactNode } from 'react'

const NavButton = ({ label, path }: { label: string; path: string }) => {
  return (
    <li className=" h-full w-full border-l">
      <Link
        className="flex h-full w-full items-center justify-center hover:bg-amber-500"
        href={path}
      >
        {label}
      </Link>
    </li>
  )
}

export default function StreamingCommmonLayout({ children }: { children: ReactNode }) {
  const commonPath = '/caching'
  const navButtons = [
    { label: 'to Request Memoization', path: '/req-memo' },
    { label: 'to Data Cache', path: '/dashboard' },
    { label: 'to Router Cache', path: '/linking' },
    { label: 'to Full Route Cache', path: '/linking' },
  ]
  return (
    <section>
      <nav className="border-b px-10">
        <article className="flex h-16 items-center justify-around border-x">
          <div className="flex h-full w-full flex-shrink-[2] items-center justify-center hover:bg-sky-600">
            Global Nav in Parent Segment Layout
          </div>
          <ul className="flex h-full w-full max-w-[70%] items-center justify-between">
            {navButtons.map((navButton) => {
              const { label, path } = navButton
              return <NavButton label={label} path={commonPath + path} key={path}></NavButton>
            })}
          </ul>
        </article>
      </nav>
      {children}
    </section>
  )
}
