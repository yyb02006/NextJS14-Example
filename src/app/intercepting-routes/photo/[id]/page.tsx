export default function PhotoPage({ params }: { params: { id: string } }) {
  return <div>Hello PhotoPage! number{params.id}</div>
}
