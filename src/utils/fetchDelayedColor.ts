export type DelayedDivBgColors =
  | 'rose'
  | 'amber'
  | 'green'
  | 'teal'
  | 'cyan'
  | 'indigo'
  | 'purple'
  | 'fuchsia'

export interface FetchDelayedColorReturn {
  success: boolean
  color: DelayedDivBgColors
  delaySec: number
}

export default function fetchDelayedColor(delaySec: number, color: DelayedDivBgColors) {
  return new Promise<FetchDelayedColorReturn>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        color,
        delaySec,
      })
    }, delaySec * 1000)
  })
}
