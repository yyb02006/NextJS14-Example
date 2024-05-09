'use client'

import { useEffect, useState } from 'react'

export default function ClientComponentFetch() {
  const [data, setData] = useState<string>('')
  useEffect(() => {
    const fetchTime = async () => {
      const data = await (await fetch('http://localhost:3000/api/caching')).json()
      setData(data.time)
    }
    fetchTime()
  }, [])
  return <div>{data}</div>
}
