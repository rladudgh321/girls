"use client";

import Link from "next/link";
import { StringToArrayPropsWithoutImages } from "../../types";
import TagButton from "./TagButton";
import { useCallback } from "react";
import { deletePostAPI } from "../../api/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface User {
  id: string;
  role: 'ADMIN' | 'USER'; // 'ADMIN'과 'USER'만 있을 경우
}

const PostRow = ({
  post,
  index,
  currentPage,
  postsPerPage,
  tag,
  handleTagClick,
  isUser,
}: {
  post: StringToArrayPropsWithoutImages;
  index: number;
  currentPage: number;
  postsPerPage: number;
  tag: string;
  handleTagClick: (tag: string) => void;
  isUser: User | null; // isUser가 null일 수 있음
}) => {
  const queryClient = useQueryClient();

  const mutationDeletePost = useMutation({
    mutationFn: deletePostAPI,
    onMutate: async (variables) => {
      // 낙관적 업데이트: 삭제를 먼저 처리하고 UI에 반영
      await queryClient.cancelQueries({ queryKey: ['post'] });
      const previousData = queryClient.getQueryData(['post']);
      
      // 포스트 삭제 UI 반영
      queryClient.setQueryData(['post'], (oldData: any) => {
        return {
          ...oldData,
          data: oldData?.data.filter((p: any) => p.id !== variables.id), // 해당 ID의 포스트를 제거
        };
      });

      // 롤백을 위해 이전 데이터를 반환
      return { previousData };
    },
    onError: (error, variables, context) => {
      // 오류 발생 시 캐시 상태를 롤백
      queryClient.setQueryData(['post'], context?.previousData);
    },
    onSuccess: () => {
      // 삭제 후, 데이터 새로 고침
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
    onSettled: () => {
      // 성공/실패 후 데이터 새로 고침
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });

  const onDeletePost = useCallback((postId: number) => {
    if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      const token = localStorage.getItem('authorization');
      if (!token) {
        console.error('토큰이 없습니다');
        return;
      }
      mutationDeletePost.mutate({ id: postId, token });
    }
  }, [mutationDeletePost]);

  const { role } = isUser || {}; // isUser에서 role을 구조 분해
  const isAdmin = role === 'ADMIN'; // 'ADMIN' 역할 확인

  return (
    <tr key={post.id} className="border-b hover:bg-gray-50">
      <td className="py-2 px-4">
        {index + 1 + (currentPage - 1) * postsPerPage}
      </td>
      <td className="py-2 px-4">
        <Link
          href={`/post/${Number(post.id)}?page=${currentPage}${tag ? `&tag=${tag}` : ""}`}
          className="text-blue-600 hover:text-blue-800"
        >
          {post.title}
        </Link>
      </td>
      <td className="py-2 px-4">
        {post.tags?.map((tag) => (
          <TagButton key={tag.id} tag={tag} handleTagClick={handleTagClick} />
        ))}
      </td>
      <td>
        {isAdmin && (
          <button
            onClick={() => onDeletePost(post.id)}
            disabled={mutationDeletePost.isPending}
            className={`px-4 py-2 ${mutationDeletePost.isPending ? 'bg-gray-300' : 'bg-red-600 text-white'} rounded`}
          >
            {mutationDeletePost.isPending ? '삭제 중...' : '삭제'}
          </button>
        )}
      </td>
    </tr>
  );
};

export default PostRow;
