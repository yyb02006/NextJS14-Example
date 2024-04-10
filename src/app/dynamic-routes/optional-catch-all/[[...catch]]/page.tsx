export default function OptionalCatchAllPage({ params }: { params: { catch?: string[] } }) {
  return (
    <div>
      Hello OptionalCatchAllPage!
      <div>
        Current Optional Catch-all Segments ={' '}
        {params.catch
          ? params.catch.reduce((acc, param) => `${acc}/${param}`, '')
          : "Doesn't exist any segments"}
      </div>
    </div>
  )
}
