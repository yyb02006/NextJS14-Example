export default async function RouteHandlerRequestPage() {
  const data = await (
    await fetch('http://localhost:3000/api/non-ui-response', { method: 'GET' })
  ).text()
  console.log(data)
  return <section>{data}</section>
}
