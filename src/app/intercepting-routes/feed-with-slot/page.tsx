import Link from 'next/link'

export default function FeedWithSlotPage() {
  return (
    <div className="mt-20 flex h-full w-full items-center justify-center">
      <ul className="grid grid-cols-2 gap-4">
        <li className="flex h-[300px] w-[300px] items-center justify-center bg-pink-500 text-2xl font-semibold">
          <Link
            href="/intercepting-routes/photo/1"
            className="flex h-full w-full items-center justify-center"
          >
            photo 1
          </Link>
        </li>
        <li className="flex h-[300px] w-[300px] items-center justify-center bg-green-500 text-2xl font-semibold">
          <Link
            href="/intercepting-routes/photo/2"
            className="flex h-full w-full items-center justify-center"
          >
            photo 2
          </Link>
        </li>
        <li className="flex h-[300px] w-[300px] items-center justify-center bg-amber-500 text-2xl font-semibold">
          <Link
            href="/intercepting-routes/photo/3"
            className="flex h-full w-full items-center justify-center"
          >
            photo 3
          </Link>
        </li>
        <li className="flex h-[300px] w-[300px] items-center justify-center bg-sky-500 text-2xl font-semibold">
          <Link
            href="/intercepting-routes/photo/4"
            className="flex h-full w-full items-center justify-center"
          >
            photo 4
          </Link>
        </li>
      </ul>
    </div>
  )
}
