const fetchComment = () => {
  return new Promise<{ success: boolean; comment: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        comment: 'Comments were fetched successfully. ( delayed 3 seconds )',
      })
    }, 3000)
  })
}

export default async function FetchComment() {
  const { comment } = await fetchComment()
  return <div>{comment}</div>
}
