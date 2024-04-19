export default function PhotoModal({ params }: { params: { id: string } }) {
  return (
    <article className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
      <div className="absolute left-0 top-0 h-full w-full bg-black opacity-50"></div>
      <div className="relative flex h-[600px] w-[1000px] items-center justify-center bg-red-500 text-3xl font-semibold">
        this modal about photo{params.id} page
      </div>
    </article>
  )
}
