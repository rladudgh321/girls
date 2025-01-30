"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Pagination = ({
  currentPage,
  totalPages,
  // postsPerPage,
  // tag,
}: {
  currentPage: number;
  totalPages: number;
  postsPerPage: number;
  tag: string;
}) => {
  const router = useRouter();

  const [pageLimit, setPageLimit] = useState(10);

  useEffect(() => {
    const updatePageLimit = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setPageLimit(10);
      } else if (width >= 768) {
        setPageLimit(5);
      } else {
        setPageLimit(3);
      }
    };

    updatePageLimit();
    window.addEventListener("resize", updatePageLimit);
    return () => {
      window.removeEventListener("resize", updatePageLimit);
    };
  }, []);

  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', page.toString());
    router.push(`?${searchParams.toString()}`, { scroll: false });
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
