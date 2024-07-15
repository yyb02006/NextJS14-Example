import NavButton from '#/components/NavButton'
import { ReactNode } from 'react'

export default function StreamingCommmonLayout({ children }: { children: ReactNode }) {
  const navButtons = [
    { label: 'to Home', path: '/' },
    { label: 'to Dashboard', path: '/dashboard' },
    { label: 'to Linking', path: '/linking' },
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
              return <NavButton label={label} path={path} key={path}></NavButton>
            })}
          </ul>
        </article>
      </nav>
      {children}
    </section>
  )
}
