'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <div>
      Something Went Wrong!{' '}
      <button type="button" onClick={() => reset()} className="bg-amber-600 px-2">
        Try agin
      </button>
    </div>
  )
}
