// /components/PostList.tsx
"use client";

import { useQuery } from "@tanstack/react-query"; // useQuery 임포트
import PostTable from './PostTable'; // 게시글 테이블 컴포넌트
import { getPostsAPI } from '../api/post';

interface PostListProps {
  searchParams?: { postsPerPage?: string; page?: string; tag?: string }; // tag 파라미터 추가
}

export default function PostList({ searchParams }: PostListProps) {
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;
  const postsPerPage = searchParams?.postsPerPage ? parseInt(searchParams.postsPerPage) : 10; // 기본값 10
  const tag = searchParams?.tag || ''; // 태그 파라미터 처리

  // useQuery를 사용하여 게시물 데이터와 총 게시물 수를 가져옵니다.
  const { data, error, isLoading } = useQuery(
    {queryKey: ['post', currentPage, postsPerPage, tag],
    queryFn: () => getPostsAPI({ page: currentPage, postsPerPage, tag })
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const { totalCount, posts } = data || {};
  const totalPages = Math.ceil(totalCount / postsPerPage); // 전체 페이지 수 계산

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">게시판</h1>
      <PostTable
        initialPosts={posts || []}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        tag={tag} // 태그도 전달
      />
    </div>
  );
}
