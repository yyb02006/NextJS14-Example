const fetchDogData = () => {
  return new Promise<{ success: boolean; data: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: 'The dog is a domesticated descendant of the wolf.',
      })
    }, 3000)
  })
}

export async function GET() {
  const { data, success } = await fetchDogData()
  return Response.json({ data })
}
