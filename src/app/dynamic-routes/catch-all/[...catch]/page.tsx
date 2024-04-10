export default function CatchAllPage({ params }: { params: { catch: string[] } }) {
  return (
    <div>
      Hello CatchAllPage!
      <div>
        Current Catch-all Segments = {params.catch.reduce((acc, param) => `${acc}/${param}`, '')}
      </div>
    </div>
  )
}
