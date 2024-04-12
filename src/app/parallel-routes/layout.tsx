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
    <section className="h-screen">
      <nav className="fixed w-full border-b bg-black px-10">
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
      <section className="flex h-full w-full items-center justify-center pt-16">
        <div className="gire grid h-[600px] w-[1200px] grid-cols-2 gap-4 text-2xl font-bold ">
          <div className="flex h-full w-full items-center justify-center bg-pink-500">
            {children}
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex h-full items-center justify-center bg-indigo-500">{hello}</div>
            <div className="flex h-full items-center justify-center bg-sky-600">{world}</div>
          </div>
        </div>
      </section>
    </section>
  )
}
