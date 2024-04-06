/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * redirects 옵션으로 path, header, cookie, and query matching에 대해 리다이렉션 가능
   * ref : https://nextjs.org/docs/app/api-reference/next-config-js/redirects
   * */
  async redirects() {
    return [{ source: '/linking-and-navigating/redirecting', destination: '/', permanent: false }]
  },
}

export default nextConfig
