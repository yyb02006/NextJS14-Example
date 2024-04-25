const fetchDogData = (id: string | null) => {
  return new Promise<{ success: boolean; data: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: `id = ${id}`,
      })
    }, 3000)
  })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const response = await fetchDogData(id)
  const { data, success } = response
  return Response.json({ data })
}
