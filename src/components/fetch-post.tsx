const fetchComment = () => {
  return new Promise<{ success: boolean; post: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        post: 'Post was fetched successfully. ( delayed 5 seconds )',
      })
    }, 5000)
  })
}

export default async function FetchPost() {
  const { post } = await fetchComment()
  return <div>{post}</div>
}
