export default function PhotoPage({ params }: { params: { id: string } }) {
  return (
    <section className="flex items-center justify-center pt-40">
      <div className="flex h-[400px] w-[400px] items-center justify-center bg-pink-600 pb-10">
        Hello PhotoPage! number{params.id}
      </div>
    </section>
  )
}
