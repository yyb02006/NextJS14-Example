import Link from 'next/link'

export default function FeedPage() {
  return (
    <section className="flex items-center justify-center pt-40">
      <Link href="/intercepting-routes/photo/140">
        <div className="flex h-[400px] w-[400px] items-center justify-center bg-pink-600 pb-10">
          Click to intercept
        </div>
      </Link>
    </section>
  )
}
