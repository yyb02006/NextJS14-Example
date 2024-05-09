export default async function ServerComponentFetch() {
  const data = await (await fetch('http://localhost:3000/api/caching')).json()
  return <div>{data.time}</div>
}
