import { RequestInit } from 'next/dist/server/web/spec-extension/request'

export default async function fetchImage({
  requestInit = undefined,
  kind,
}: {
  requestInit?: RequestInit | undefined
  kind: 'cat' | 'dog'
}) {
  return await (await fetch(`https://api.the${kind}api.com/v1/images/search`, requestInit)).json()
}
