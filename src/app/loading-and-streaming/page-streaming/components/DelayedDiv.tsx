import { DelayedDivBgColors } from '#/utils/fetchDelayedColor'

export default function DelayedDiv({
  color,
  delaySec,
}: {
  color: DelayedDivBgColors
  delaySec: number
}) {
  const bgColor = {
    rose: `bg-rose-600`,
    amber: `bg-amber-600`,
    green: `bg-green-600`,
    teal: `bg-teal-600`,
    cyan: `bg-cyan-600`,
    indigo: `bg-indigo-600`,
    purple: `bg-purple-600`,
    fuchsia: `bg-fuchsia-600`,
  }
  return (
    <div className={bgColor[color]}>
      {color[0].toUpperCase() + color.slice(1)}Div was fetched successfully. ( delayed {delaySec}
      seconds )
    </div>
  )
}
