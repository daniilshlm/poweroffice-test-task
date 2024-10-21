import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
}

interface PaginationResult {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  totalPages: number;
  goToPage: (page: number) => void;
}

export function usePagination({
  totalItems,
  itemsPerPage,
  initialPage = 1,
}: UsePaginationProps): PaginationResult {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const router = useRouter();

  useEffect(() => {
    const page = parseInt((router.query.page as string) || '1', 10);
    setCurrentPage(page);
  }, [router.query.page]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const updateURL = useCallback(
    (page: number) => {
      router.push({ query: { ...router.query, page } }, undefined, { shallow: true });
    },
    [router]
  );

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      updateURL(currentPage + 1);
    }
  }, [currentPage, totalPages, updateURL]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      updateURL(currentPage - 1);
    }
  }, [currentPage, updateURL]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        updateURL(page);
      }
    },
    [totalPages, updateURL]
  );

  return { currentPage, nextPage, prevPage, totalPages, goToPage };
}
