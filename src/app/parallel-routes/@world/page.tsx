'use client'

import { timeout } from '#/utils/timeout'
import { useEffect, useState } from 'react'

export default function WorldSlotPage() {
  const [data, setData] = useState<string>('')
  useEffect(() => {
    const fetchData = async () => {
      const response = await timeout({
        success: true,
        delayMs: 5000,
        resolveProps: { comment: 'Worlds were fetched successfully. ( delayed 5 seconds )' },
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
          /@world/page.tsx
          <div className="text-sm font-normal">{data}</div>
        </>
      ) : (
        <div>wating for fetching...</div>
      )}
    </div>
  )
}
