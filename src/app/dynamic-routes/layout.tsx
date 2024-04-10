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
  const navButtons = [
    { label: 'to [dynamic]', path: '/dynamic-routes/n' },
    { label: 'to [...Catch-all]', path: '/dynamic-routes/catch-all/c/a/t/c/h/a/l/l' },
    { label: 'to [[...Optional-Catch-all]]', path: '/dynamic-routes/optional-catch-all' },
  ]
  return (
    <section>
      <nav className="border-b px-10">
        <article className="flex h-16 items-center justify-around border-x">
          <div className="flex h-full w-full flex-shrink-[2] items-center justify-center hover:bg-sky-600">
            Global Nav in Dynamic Routes
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
