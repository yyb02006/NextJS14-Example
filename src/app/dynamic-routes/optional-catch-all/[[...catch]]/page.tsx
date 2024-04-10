export default function OptionalCatchAllPage({ params }: { params: { catch?: string[] } }) {
  return (
    <div>
      Hello OptionalCatchAllPage!
      <div>
        Current World Optional Catch-all Segments ={' '}
        {params.catch ? "Doesn't exist any segments" : params.catch}
      </div>
    </div>
  )
}
