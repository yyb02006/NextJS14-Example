export default function DynamicHelloPage({ params }: { params: { hello: string } }) {
  return (
    <div>
      Hello DynamicHelloPage!<div>Current Hello Params = {params.hello}</div>
    </div>
  )
}
