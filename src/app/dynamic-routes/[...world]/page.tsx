export default function DynamicWorldPage({ params }: { params: { world: string } }) {
  return (
    <div>
      Hello DynamicWorldPage!<div>Current World Catch-all Segments = {params.world}</div>
    </div>
  )
}
