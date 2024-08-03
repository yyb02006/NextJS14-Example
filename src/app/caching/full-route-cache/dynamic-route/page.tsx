export const dynamic = 'force-dynamic'

/**
 *
 * Caching => #Full Route Cache
 *
 *
 * 1. 다이나믹 라우트, API핸들러의 경우에는 Full Route Cache가 Optout된다.
 *
 *
 */
export default function DynamicRoutePage() {
  console.log('Full-Route-Cached Optout Page')
  return <div>Hello DynamicRoutePage!</div>
}
