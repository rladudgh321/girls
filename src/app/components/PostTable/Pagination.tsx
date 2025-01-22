"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Pagination = ({
  currentPage,
  totalPages,
  tag,
}: {
  currentPage: number;
  totalPages: number;
  postsPerPage: number;
  tag: string;
}) => {
  const router = useRouter();
  
  // 화면 크기에 따라 페이지 번호 범위를 조정하기 위한 상태
  const [pageLimit, setPageLimit] = useState(10);

  useEffect(() => {
    const updatePageLimit = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setPageLimit(10); // 화면이 1024px 이상일 경우 페이지 번호 10개씩 표시
      } else if (width >= 768) {
        setPageLimit(5);  // 화면이 768px 이상 1024px 미만일 경우 페이지 번호 5개씩 표시
      } else {
        setPageLimit(3);  // 화면이 768px 미만일 경우 페이지 번호 3개씩 표시
      }
    };

    // 처음 화면이 로드되었을 때 및 화면 크기 변경 시에 페이지 번호 범위 계산
    updatePageLimit();
    window.addEventListener("resize", updatePageLimit);
    return () => {
      window.removeEventListener("resize", updatePageLimit);
    };
  }, []);

  const handlePageChange = (page: number) => {
    router.push(
      `?page=${page}${tag ? `&tag=${tag}` : ""}`,
      { scroll: false }
    );
  };

  const getPaginationRange = (currentPage: number, totalPages: number, limit: number) => {
    const startPage = Math.max(1, Math.floor((currentPage - 1) / limit) * limit + 1);
    const endPage = Math.min(startPage + limit - 1, totalPages);
    const range = [];
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    return range;
  };

  const paginationRange = getPaginationRange(currentPage, totalPages, pageLimit);

  return (
    <div className="flex justify-center mt-6">
      {currentPage > 1 && (
        <button
          className="px-4 py-2 border rounded-md mx-2 bg-gray-200 hover:bg-gray-300"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          이전
        </button>
      )}

      {paginationRange.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 border rounded-md mx-2 ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          className="px-4 py-2 border rounded-md mx-2 bg-gray-200 hover:bg-gray-300"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          다음
        </button>
      )}
    </div>
  );
};

export default Pagination;
