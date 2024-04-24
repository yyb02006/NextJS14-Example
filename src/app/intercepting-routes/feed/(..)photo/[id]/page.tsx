'use client'

export default function InterceptingFeedPage({ params }: { params: { id: string } }) {
  return (
    <div>
      Hello InterceptingPhotoPage! number{params.id}
      <div>
        <button
          type="button"
          onClick={() => {
            window.location.href = '/intercepting-routes/photo/140'
          }}
        >
          Click to Real Page
        </button>
      </div>
    </div>
  )
}
