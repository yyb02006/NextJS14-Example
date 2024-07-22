import NavButton from '#/components/NavButton'
import { ReactNode } from 'react'

export default function RouteGroupsLayout({ children }: { children: ReactNode }) {
  const navButtons = [
    { label: 'to Hello', path: '/route-groups/hello' },
    { label: 'to World', path: '/route-groups/world' },
  ]
  return (
    <section>
      <nav className="border-b px-10">
        <article className="flex h-16 items-center justify-around border-x">
          <div className="flex h-full w-full flex-shrink-[2] items-center justify-center hover:bg-sky-600">
            Global Nav for Route-Groups
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
    </section>
  )
}
