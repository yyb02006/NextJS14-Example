import NavButton from '#/components/NavButton'
import { ReactNode } from 'react'

export default function CachingLayout({ children }: { children: ReactNode }) {
  const commonPath = '/caching'
  const navButtons = [
    { label: 'to Request Memoization', path: '/req-memo' },
    { label: 'to Data Cache', path: '/data-cache' },
    { label: 'to Router Cache', path: '/router-cache' },
    { label: 'to Full Route Cache', path: '/full-route-cache' },
  ]
  return (
    <section>
      <nav className="border-b px-10">
        <div className="flex h-16 items-center justify-around border-x">
          <div className="flex h-full w-full flex-shrink-[2] items-center justify-center hover:bg-sky-600">
            Global Nav in Parent Segment Layout
          </div>
          <ul className="flex h-full w-full max-w-[70%] items-center justify-between">
            {navButtons.map((navButton) => {
              const { label, path } = navButton
              return <NavButton label={label} path={commonPath + path} key={path}></NavButton>
            })}
          </ul>
        </div>
      </nav>
      {children}
    </section>
  )
}
