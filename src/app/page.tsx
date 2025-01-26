// app/page.tsx (서버 컴포넌트)

import PostList from './components/PostList'; // PostList 컴포넌트 가져오기

export default async function Home({
  searchParams,
}: {
  searchParams?: { postsPerPage?: string };
}) {
  return (
    <div>
      <PostList searchParams={searchParams} />
    </div>
  );
}

// ISR 설정: 5분마다 새로 고침
export const revalidate = 60;
export const dynamic = 'force-static'