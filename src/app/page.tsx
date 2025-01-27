// app/page.tsx (서버 컴포넌트)

import { memo, useMemo } from 'react';
import PostList from './components/PostList'; // PostList 컴포넌트 가져오기


// ISR 설정: 5분마다 새로 고침
export const revalidate = 120;

const Home= ({
  searchParams,
}: {
  searchParams?: { page?: string };
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  console.log('Home');
  console.log('Home searchParams', searchParams);
  return (
    <div>
      <PostList searchParams={searchParams} />
    </div>
  );
}

export default memo(Home);