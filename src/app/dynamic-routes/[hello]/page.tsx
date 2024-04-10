export const dynamicParams = false

const fetchParams = () => {
  return new Promise<{ success: boolean; params: string[] }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true, params: ['n', 'e', 'x', 't'] })
    }, 3000)
  })
}

export async function generateStaticParams() {
  const response = await fetchParams()
  return response.params.map((param) => ({ hello: param }))
}

export default function DynamicHelloPage({ params }: { params: { hello: string } }) {
  return (
    <div>
      Hello DynamicHelloPage!<div>Current Hello Params = {params.hello}</div>
    </div>
  )
}
