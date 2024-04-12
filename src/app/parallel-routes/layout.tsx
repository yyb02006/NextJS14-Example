'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation'
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

export default function StreamingCommmonLayout({
  children,
  hello,
  world,
}: {
  children: ReactNode
  hello: ReactNode
  world: ReactNode
}) {
  const selected = useSelectedLayoutSegment('hello')
  const selecteds = useSelectedLayoutSegments('hello')
  console.log(selected, selecteds)

  const navButtons = [
    { label: 'to Hello', path: '/parallel-routes/hello' },
    { label: 'to World', path: '/parallel-routes/world' },
    { label: 'to Parent', path: '/parallel-routes' },
  ]
  return (
    <section>
      <nav className="border-b px-10">
        <article className="flex h-16 items-center justify-around border-x">
          <div className="flex h-full w-full flex-shrink-[2] items-center justify-center hover:bg-sky-600">
            Global Nav in Parallel Routes Layout
          </div>
          <ul className="flex h-full w-full max-w-[70%] items-center justify-between">
            {navButtons.map((navButton) => {
              const { label, path } = navButton
              return <NavButton label={label} path={path} key={path}></NavButton>
            })}
          </ul>
        </article>
      </nav>
      {children}
      {hello}
      {world}
    </section>
  )
}
