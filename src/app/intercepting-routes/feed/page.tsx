'use client'

import Link from 'next/link'

export default function FeedPage() {
  return (
    <div>
      <Link href="/intercepting-routes/photo/140">Click to intercept</Link>
    </div>
  )
}
