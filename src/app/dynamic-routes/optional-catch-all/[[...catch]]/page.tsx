export default function OptionalCatchAllPage({ params }: { params: { catch?: string[] } }) {
  return (
    <div>
      Hello OptionalCatchAllPage!
      <div>
        Current Optional Catch-all Segments ={' '}
        {params.catch ? "Doesn't exist any segments" : params.catch}
      </div>
    </div>
  )
}
