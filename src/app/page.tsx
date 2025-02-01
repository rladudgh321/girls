// app/page.tsx (서버 컴포넌트)

import { memo } from 'react';
import PostList from './components/PostList'; // PostList 컴포넌트 가져오기

const Home= ({
  searchParams,
}: {
  searchParams?: { page?: string };
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <div>
      <PostList searchParams={searchParams} />
    </div>
  );
}

export default memo(Home);