'use client'

import { useEffect } from 'react'

export default function CallRequestMemoizationComponent({ order }: { order: number }) {
  useEffect(() => {
    const apiCall = async () => {
      console.log('GET 리퀘스트 컴포넌트 렌더링')
      const respones = await (await fetch('api/caching/request-memoization')).json()
      console.log('응답 = ', respones)
    }
    apiCall()
  }, [])
  return <div>{`${order} 번째 컴포넌트`}</div>
}
