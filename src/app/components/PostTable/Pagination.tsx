"use client";

import { useRouter } from "next/navigation";

const Pagination = ({
  currentPage,
  totalPages,
  postsPerPage,
  tag,
}: {
  currentPage: number;
  totalPages: number;
  postsPerPage: number;
  tag: string;
}) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(
      `?page=${page}${tag ? `&tag=${tag}` : ""}`,
      { scroll: false }
    );
  };

  const getPaginationRange = (currentPage: number, totalPages: number) => {
    const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const endPage = Math.min(startPage + 9, totalPages);
    const range = [];
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    return range;
  };

  const paginationRange = getPaginationRange(currentPage, totalPages);

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
