'use client'

import { timeout } from '#/utils/timeout'
import { useEffect, useState } from 'react'

export default function HelloSlotPage() {
  const [data, setData] = useState<string>('')
  useEffect(() => {
    const fetchData = async () => {
      const response = await timeout({
        success: true,
        resolveProps: { comment: 'Hello was fetched successfully. ( delayed 3 seconds )' },
      })
      console.log(response.comment)
      setData(response.comment)
    }
    fetchData()
  }, [])
  return (
    <div className="text-center">
      {data ? (
        <>
          /@hello/page.tsx
          <div className="text-sm font-normal">{data}</div>
        </>
      ) : (
        <div>wating for fetching...</div>
      )}
    </div>
  )
}
