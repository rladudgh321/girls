"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserIdAPI } from "../../api/user";
import PostRow from "./PostRow";
import Pagination from "./Pagination";

export default function PostTable({
  initialPosts,
  postsPerPage,
  currentPage,
  totalPages,
  tag,
}: {
  initialPosts: any[];
  postsPerPage: number;
  currentPage: number;
  totalPages: number;
  tag: string;
}) {
  const router = useRouter();
  const [isUser, setUser] = useState<{ id: string; role: 'ADMIN' | 'USER' }>({id: '', role:'USER'});

  const handleTagClick = (tag: string) => {
    router.push(`?tag=${tag}&page=1`, { scroll: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage?.getItem('authorization');
      if (token) {
        try {
          const user = await getUserIdAPI(token as string);
          // 기존 상태와 비교해서 변경된 값만 설정
          setUser((prevState) => {
            if (!prevState || prevState.id !== user?.id || prevState.role !== user.role) {
              return user;
            }
            return prevState; // 값이 변경되지 않으면 상태 업데이트를 하지 않음
          });
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchData();
  }, []); // 의존성 배열에 빈 배열을 사용하여 한 번만 실행되도록
  return (
    <div>
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">번호</th>
            <th className="py-2 px-4 border-b text-left">제목</th>
            <th className="py-2 px-4 border-b text-left">태그</th>
            {isUser?.role === 'ADMIN' && <th className="py-2 px-4 border-b text-left">작업</th>}
          </tr>
        </thead>
        <tbody>
          {initialPosts.map((post, index) => (
            <PostRow
              key={post.id}
              post={post}
              index={index}
              currentPage={currentPage}
              postsPerPage={postsPerPage}
              tag={tag}
              handleTagClick={handleTagClick}
              isUser={isUser}
            />
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        postsPerPage={postsPerPage}
        tag={tag}
      />
    </div>
  );
}
