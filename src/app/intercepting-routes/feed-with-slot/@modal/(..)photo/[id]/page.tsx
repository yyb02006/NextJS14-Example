'use client'

import { useRouter } from 'next/navigation'

export default function PhotoModal({ params }: { params: { id: string } }) {
  const router = useRouter()
  return (
    <article className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
      <div className="absolute left-0 top-0 h-full w-full bg-black opacity-50"></div>
      <div className="relative h-[600px] w-[1000px] bg-red-500">
        <div className="flex h-full w-full items-center justify-center text-3xl font-semibold">
          this modal about photo{params.id} page
        </div>
        <button
          onClick={() => {
            router.back()
          }}
          className="absolute right-2 top-2 flex h-8 w-8 items-center"
        >
          <div className="absolute left-0 top-[50%] h-[2px] w-full rotate-45 bg-black" />
          <div className="absolute left-0 top-[50%] h-[2px] w-full rotate-[135deg] bg-black" />
        </button>
      </div>
    </article>
  )
}
