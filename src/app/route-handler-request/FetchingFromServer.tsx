import { timeout } from '#/utils/timeout'

export default async function ServerComponentFetch() {
  const data = await timeout({
    success: true,
    delayMs: 3000,
    resolveProps: { time: new Date().getTime() },
  })
  console.log('run server')
  return <div>{data.time}</div>
}
