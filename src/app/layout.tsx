import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const notoSansKr = Noto_Sans_KR({ subsets: ['latin'] })

// 아무래도 메타데이터를 서버컴포넌트에 넣는 것이 SEO에 좋아보인다.
export const metadata: Metadata = {
  title: 'NextJS14-Example',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={notoSansKr.className}>{children}</body>
    </html>
  )
}
