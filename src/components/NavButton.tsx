import Link from 'next/link'

interface NavButtonProps {
  label: string
  path: string
}

const NavButton: React.FC<NavButtonProps> = ({ label, path }) => {
  return (
    <li className="h-full w-full border-l">
      <Link
        className="flex h-full w-full items-center justify-center hover:bg-amber-500"
        href={path}
      >
        {label}
      </Link>
    </li>
  )
}

export default NavButton
export type { NavButtonProps }
