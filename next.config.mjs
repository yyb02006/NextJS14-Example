/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * redirects 옵션으로 path, header, cookie, and query matching에 대해 리다이렉션 가능
   * ref : https://nextjs.org/docs/app/api-reference/next-config-js/redirects
   * */
  async redirects() {
    return [
      { source: '/linking-and-navigating/redirecting', destination: '/', permanent: true },
      /* 
      아래와 같이 와일드카드도 경로로 입력 가능
      { source: '/linking-and-navigating:slug', destination: '/', permanent: false },
      */
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn2.thecatapi.com' },
      { protocol: 'https', hostname: 'cdn2.thedogapi.com' },
    ],
  },
  logging: { fetches: { fullUrl: true } },
}

export default nextConfig
