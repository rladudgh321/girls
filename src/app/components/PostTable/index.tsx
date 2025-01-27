"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserIdAPI } from "../../api/user";
import PostRow from "./PostRow";
import Pagination from "./Pagination";

const PostTable = ({
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
}) => {
  const router = useRouter();
  const [isUser, setUser] = useState<{ id: string; role: 'ADMIN' | 'USER' }>({ id: '', role: 'USER' });

  const handleTagClick = useCallback((tag: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('tag', tag);
    searchParams.set('page', '1');
    router.push(`?${searchParams.toString()}`, { scroll: false });
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage?.getItem('authorization');
      if (token) {
        try {
          const user = await getUserIdAPI(token as string);
          setUser(user);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };
    fetchData();
  }, []);

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

export default memo(PostTable);
