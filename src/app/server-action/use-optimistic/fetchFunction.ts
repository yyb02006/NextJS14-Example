'use server'

export default async function sendForOptimistic(message: FormDataEntryValue | null) {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(message)
    }, 1000)
  })
  return data
}
