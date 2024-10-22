import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies } from '@/redux/slices/companySlice';
import { AppDispatch, RootState } from '@/redux/store';
import { FetchCompaniesPayload } from '@/types/company';

interface PaginationProps {
  initialPage: number;
}

const Pagination = ({ initialPage }: PaginationProps): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const currentPage = parseInt((router.query.page as string) || `${initialPage}`, 10);

  const totalItems = useSelector((state: RootState) => state.company.totalItems);
  const totalPages = useSelector((state: RootState) => state.company.totalPages);

  const handlePageChange = (newPage: number): void => {
    if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, page: newPage.toString() },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  useEffect(() => {
    const query = {
      navn: (router.query.navn as string) || '',
      sort: (router.query.sort as string) || 'ASC',
      size: (router.query.size as string) || '10',
      page: (router.query.page as string) || '1',
    };
    dispatch(fetchCompanies(query as FetchCompaniesPayload));
  }, [router.query, dispatch]);

  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages - 1}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
      >
        Next
      </button>
      <span>Total items: {totalItems}</span>
    </div>
  );
};

export default Pagination;
