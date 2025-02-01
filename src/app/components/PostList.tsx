// /components/PostList.tsx
"use client";

import { useQuery } from '@tanstack/react-query';
import PostTable from './PostTable'; // 게시글 테이블 컴포넌트
import { getPostsAPI } from '../api/post';
import { memo, useMemo } from 'react';

interface PostListProps {
  searchParams?: { postsPerPage?: string; page?: string; tag?: string }; // tag 파라미터 추가
}

const PostList = ({ searchParams }: PostListProps) => {
  const currentPage = useMemo(() => searchParams?.page ? parseInt(searchParams.page) : 1 ,[searchParams?.page])
  const postsPerPage = useMemo(() => searchParams?.postsPerPage ? parseInt(searchParams.postsPerPage) : 10, [searchParams?.postsPerPage]); // 기본값 10
  const tag = useMemo(() => searchParams?.tag || '', [searchParams?.tag]) // 태그 파라미터 처리

  const { data, error, isLoading } = useQuery(
    {queryKey: ['post', currentPage, postsPerPage, tag],
    queryFn: () => getPostsAPI({ page: currentPage, postsPerPage, tag })
  });

  
  const { totalCount, posts } = data || {};
  const totalPages = useMemo(() => Math.ceil(totalCount / postsPerPage),[postsPerPage, totalCount]); // 전체 페이지 수 계산
  const memoPost = useMemo(() => posts, [posts]);
  
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">게시판</h1>
      <PostTable
        initialPosts={memoPost || []}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        tag={tag}
      />
    </div>
  );
}

export default memo(PostList);