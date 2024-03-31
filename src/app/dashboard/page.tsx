import { Metadata } from 'next';

/**
 *
 * Optimizing => [Metadata]
 *
 *
 * 1. metadata로 메타데이터를 다루기 더 쉬워졌음. 객체나 객체를 리턴하는 함수로도 가능.
 *
 * 2. metadata는 layout이나 page에서 사용해야함.
 *
 * 3. 하나의 세그먼트에 대한 메타데이터라면 page, subTree에 적용되는 메타데이터라면 layout
 *
 * 4. rootLayout에 title, meta같은 <head>태그를 수동으로 추가하면 안되고 메타데이터 API를 통해 처리.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 *
 * */
export const metadata: Metadata = { title: 'Dashboard' };

/**
 *
 * Routing => [Pages and Layouts]#Pages
 *
 *
 * 1. App Router에서는 경로에 대한 UI를 page.tsx에 정의한다.
 *
 * 2. Pages Router에서 라우팅되는 파일인 Index.tsx와 같다.
 *
 * 3. page는 언제나 route subtree의 leaf이다.
 *
 *
 * ref : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 *
 * */
export default function DashboardPage() {
  return <div>Hello, Dashboard Page!</div>;
}
