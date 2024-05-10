const fetchDate = () => {
  return new Promise<{ time: number }>((resolve) => {
    setTimeout(() => {
      resolve({ time: new Date().getTime() })
    }, 300)
  })
}

export default async function ServerComponentFetch() {
  const data = await fetchDate()
  console.log('run server')
  return <div>{data.time}</div>
}
