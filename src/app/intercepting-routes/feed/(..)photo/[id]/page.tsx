'use client'

import { useRouter } from 'next/navigation'

/**
 *
 * Routing => [Intercepting Routes]
 *
 *
 * 1. (..)를 사용했기 때문에 실제 부모 경로인 intercepting-routes에서 photo 경로를 찾아 인터셉트한다.
 *
 * 2. useRouter를 사용하면 soft navigating되기 때문에 버튼을 클릭했을 때 실제 경로가 바뀌지 않는다.
 *    refresh 메서드 역시 내부적인 작동 방식은 refresh 보다는 rerendering에 가깝기 때문에 통하지 않는다.
 *    때문에 실제 경로를 바꾸기 위해서는 글로벌 객체의 location을 직접 수정하거나 하는 hard navigating 방식을 사용해야 한다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes
 *
 * */
export default function InterceptingFeedPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  return (
    <section className="flex items-center justify-center pt-40">
      <div className="relative h-[400px] w-[400px] flex-col bg-pink-600">
        <div className="absolute flex w-full justify-center p-6">
          Hello InterceptingPhotoPage! number{params.id}
        </div>
        <div className="flex h-full items-center justify-center pb-10">
          <button
            type="button"
            onClick={() => {
              // router.refresh() hard navigating이 일어나지 않는다.
              window.location.href = '/intercepting-routes/photo/140'
            }}
          >
            Click to Real Page
          </button>
        </div>
      </div>
    </section>
  )
}
