'use client'

import { useEffect, useState } from 'react'

const fetchComment = () => {
  return new Promise<{ success: boolean; comment: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        comment: 'Hello was fetched successfully. ( delayed 3 seconds )',
      })
    }, 3000)
  })
}

export default function ParallelHelloPage() {
  const [data, setData] = useState<string>('')
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchComment()
      console.log(response.comment)
      setData(response.comment)
    }
    fetchData()
  }, [])
  return (
    <div>
      Hello ParallelHelloPage!
      {data}
    </div>
  )
}
