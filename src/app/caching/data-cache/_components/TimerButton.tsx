'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function TimerButton() {
  const router = useRouter()
  const [count, setCount] = useState(10)
  const [label, setLabel] = useState<'Refresh' | null>(null)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  const onButtonClick = () => {
    if (count === 10 && label) {
      router.refresh()
      setLabel(null)
      const interval = setInterval(() => {
        setCount((p) => p - 1)
      }, 1000)
      setIntervalId(interval)
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((p) => p - 1)
    }, 1000)
    setIntervalId(interval)
    return () => {
      interval && clearInterval(interval)
    }
  }, [])
  useEffect(() => {
    if (count < 1 && intervalId !== null) {
      setCount(10)
      clearInterval(intervalId)
      setLabel('Refresh')
    }
  }, [count, intervalId])
  return (
    <button type="button" onClick={onButtonClick} className="h-10 w-20 bg-red-400">
      {label || count}
    </button>
  )
}
