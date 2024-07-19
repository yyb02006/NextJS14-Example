import fetchDelayedColor, { FetchDelayedColorReturn } from '#/utils/fetchDelayedColor'
import React from 'react'
import DelayedDiv from './DelayedDiv'

export default async function ChildComponent() {
  // 3초, 5초 중 더 긴 5초만큼 지연됨
  const delayedDivConfigs: Array<Omit<FetchDelayedColorReturn, 'success'>> = [
    { delaySec: 3, color: 'rose' },
    { delaySec: 5, color: 'teal' },
  ]
  const extractColorAndDelay = (object: FetchDelayedColorReturn) => {
    const { success, ...rest } = object
    return rest
  }
  const DelayedDivs = await Promise.all(
    delayedDivConfigs.map(async (data) => {
      const { color, delaySec } = extractColorAndDelay(
        await fetchDelayedColor(data.delaySec, data.color),
      )
      return <DelayedDiv color={color} delaySec={delaySec} key={color} />
    }),
  )
  return <section>{DelayedDivs}</section>
}
