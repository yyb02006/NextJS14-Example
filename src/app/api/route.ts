export const revalidate = 60

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
  /* 
  fetch 함수에 아래처럼 next revalidation 옵션 추가 가능

  const respones = await (
    await fetch(
      'https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1',
      { next: { revalidate: 60 } },
    )
  ).json() */
  const { data, success } = await fetchDogData()
  return Response.json({ data })
}
