"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getPostsAPI } from './api/post';

// 게시글 목록 (예시 데이터, 25개로 가정)
const posts = [
  { id: 1, title: '첫 번째 게시글', tags: ['React', 'Next.js'], date: '2024-11-01' },
  { id: 2, title: '두 번째 게시글', tags: ['JavaScript', 'Node.js'], date: '2024-11-05' },
  { id: 3, title: '세 번째 게시글', tags: ['CSS', 'Tailwind CSS'], date: '2024-11-10' },
  { id: 4, title: '네 번째 게시글', tags: ['HTML', 'Web Development'], date: '2024-11-12' },
  { id: 5, title: '다섯 번째 게시글', tags: ['React', 'Web Design'], date: '2024-11-15' },
  { id: 6, title: '여섯 번째 게시글', tags: ['JavaScript'], date: '2024-11-20' },
  { id: 7, title: '일곱 번째 게시글', tags: ['Next.js', 'React'], date: '2024-11-22' },
  { id: 8, title: '여덟 번째 게시글', tags: ['Node.js'], date: '2024-11-25' },
  { id: 9, title: '아홉 번째 게시글', tags: ['Web Development'], date: '2024-11-28' },
  { id: 10, title: '열 번째 게시글', tags: ['React', 'Node.js'], date: '2024-11-30' },
  { id: 11, title: '열한 번째 게시글', tags: ['CSS'], date: '2024-12-01' },
  { id: 12, title: '열두 번째 게시글', tags: ['HTML'], date: '2024-12-02' },
  { id: 13, title: '열세 번째 게시글', tags: ['Web Design'], date: '2024-12-05' },
  { id: 14, title: '열네 번째 게시글', tags: ['JavaScript'], date: '2024-12-07' },
  { id: 15, title: '열다섯 번째 게시글', tags: ['Tailwind CSS'], date: '2024-12-10' },
  { id: 16, title: '열여섯 번째 게시글', tags: ['React', 'Next.js'], date: '2024-12-12' },
  { id: 17, title: '열일곱 번째 게시글', tags: ['Node.js'], date: '2024-12-15' },
  { id: 18, title: '열여덟 번째 게시글', tags: ['Web Development'], date: '2024-12-18' },
  { id: 19, title: '열아홉 번째 게시글', tags: ['CSS'], date: '2024-12-20' },
  { id: 20, title: '스무 번째 게시글', tags: ['JavaScript', 'Next.js'], date: '2024-12-22' },
  { id: 21, title: '스물한 번째 게시글', tags: ['React'], date: '2024-12-24' },
  { id: 22, title: '스물두 번째 게시글', tags: ['Tailwind CSS'], date: '2024-12-26' },
  { id: 23, title: '스물세 번째 게시글', tags: ['Node.js'], date: '2024-12-28' },
  { id: 24, title: '스물네 번째 게시글', tags: ['Next.js'], date: '2024-12-30' },
  { id: 25, title: '스물다섯 번째 게시글', tags: ['Web Design'], date: '2024-12-31' },
  // 추가 게시글
  { id: 26, title: '스물여섯 번째 게시글', tags: ['Web Design'], date: '2024-12-31' },
  { id: 27, title: '스물일곱 번째 게시글', tags: ['Web Design'], date: '2024-12-31' },
  { id: 28, title: '스물여덟 번째 게시글', tags: ['Web Design'], date: '2024-12-31' },
  { id: 29, title: '스물아홉 번째 게시글', tags: ['Web Design'], date: '2024-12-31' },
  { id: 30, title: '서른 번째 게시글', tags: ['Web Design'], date: '2024-12-31' },
  { id: 31, title: '서른한 번째 게시글', tags: ['Web Design'], date: '2024-12-31' },
  { id: 32, title: '서른둘 번째 게시글', tags: ['Web Design'], date: '2024-12-31' },
];



export default function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: getPostsAPI,
  })
  console.log('data', data);





  // 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지당 보여줄 게시글 수
  const postsPerPage = 10;

  // 현재 페이지에 해당하는 게시글을 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지네이션 처리
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // 페이지 그룹 범위 (1~10, 11~20, 21~30 ...)
  const pageGroup = Math.ceil(currentPage / 10);
  const startPage = (pageGroup - 1) * 10 + 1;
  const endPage = Math.min(pageGroup * 10, totalPages);

  // 페이지 번호 클릭 시 페이지 변경
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">게시판</h1>

      {/* 게시글 목록 */}
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">번호</th>
            <th className="py-2 px-4 border-b text-left">제목</th>
            <th className="py-2 px-4 border-b text-left">태그</th>
            <th className="py-2 px-4 border-b text-left">날짜</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr key={post.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{index + 1 + (currentPage - 1) * postsPerPage}</td>
              <td className="py-2 px-4">
                <Link href={`/post/${post.id}`} className="text-blue-600 hover:text-blue-800">
                  {post.title}
                </Link>
              </td>
              <td className="py-2 px-4">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs mr-2">
                    {tag}
                  </span>
                ))}
              </td>
              <td className="py-2 px-4">{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-6">
        {/* 이전 페이지 그룹 버튼 */}
        {pageGroup > 1 && (
          <button
            className="px-4 py-2 border rounded-md mx-2 bg-gray-200 hover:bg-gray-300"
            onClick={() => setCurrentPage((pageGroup - 2) * 10 + 1)}
          >
            이전
          </button>
        )}
        
        {/* 페이지 번호 */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 border rounded-md mx-2 ${
              currentPage === startPage + index ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => paginate(startPage + index)}
          >
            {startPage + index}
          </button>
        ))}

        {/* 다음 페이지 그룹 버튼 */}
        {pageGroup * 10 < totalPages && (
          <button
            className="px-4 py-2 border rounded-md mx-2 bg-gray-200 hover:bg-gray-300"
            onClick={() => setCurrentPage(pageGroup * 10 + 1)}
          >
            다음
          </button>
        )}
      </div>
    </div>
  );
}
