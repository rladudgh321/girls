"use client";

import { useQuery } from '@tanstack/react-query';
import PostTable from './PostTable'; // 게시글 테이블 컴포넌트
import { getPostsAPI } from '../api/post';
import { memo, useEffect, useMemo, useState } from 'react';

const PostList = () => {
  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(window.location.search);
  },[])
  
  const searchParams = new URLSearchParams(url);

  // URLSearchParams에서 값 추출
  const currentPage = useMemo(() => {
    const page = searchParams.get('page');
    return page ? parseInt(page) : 1;
  }, [searchParams]);

  const postsPerPage = useMemo(() => {
    const perPage = searchParams.get('postsPerPage');
    return perPage ? parseInt(perPage) : 10; // 기본값 10
  }, [searchParams]);

  const tag = useMemo(() => {
    return searchParams.get('tag') || ''; // 태그 파라미터 처리
  }, [searchParams]);

  const { data, error, isLoading } = useQuery(
    {
      queryKey: ['post', currentPage, postsPerPage, tag],
      queryFn: () => getPostsAPI({ page: currentPage, postsPerPage, tag }),
    }
  );

  const { totalCount, posts } = data || {};
  const totalPages = useMemo(() => Math.ceil(totalCount / postsPerPage), [postsPerPage, totalCount]);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">게시판</h1>
      <PostTable
        initialPosts={posts || []}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        tag={tag}
      />
    </div>
  );
}

export default memo(PostList);
