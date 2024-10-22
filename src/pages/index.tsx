import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '@/components/Search/Search';
import CompanyList from '@/components/CompanyList/CompanyList';
import Pagination from '@/components/Pagination/Pagination';
import { RootState, AppDispatch } from '@/redux/store';
import { preloadCompanies } from '@/redux/slices/companySlice';
import { fetchCompaniesFromAPI } from '@/utils/api';
import { GetServerSideProps } from 'next';
import { Company, FetchCompaniesPayload } from '@/types/company';

interface HomePageProps {
  initialCompanies: Company[];
  initialTotalItems: number;
  initialTotalPages: number;
  searchTerm?: string;
  size?: string;
  page: string;
}

const HomePage = ({
  initialCompanies,
  initialTotalItems,
  initialTotalPages,
  searchTerm,
  size,
  page,
}: HomePageProps): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const companies = useSelector((state: RootState) => state.company.companies);

  useEffect(() => {
    if (initialCompanies) {
      dispatch(
        preloadCompanies({
          companies: initialCompanies,
          totalItems: initialTotalItems,
          totalPages: initialTotalPages,
        })
      );
    }
  }, [initialCompanies, initialTotalItems, initialTotalPages, dispatch]);

  return (
    <div>
      <h1>Company Search</h1>
      <SearchBar initialSearchTerm={searchTerm as string} initialSize={size as string} />
      <CompanyList companies={companies} />
      <Pagination initialPage={parseInt(page || '1', 10)} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const params: FetchCompaniesPayload = {
    navn: (query.navn as string) || '',
    size: (query.size as string) || '10',
    page: (query.page as string) || '1',
  };

  const data = await fetchCompaniesFromAPI(params);

  const size = parseInt(params.size || '10', 10);
  const initialTotalPages = Math.ceil(data.totalItems / size);

  return {
    props: {
      initialCompanies: data.companies,
      totalItems: data.totalItems,
      initialTotalPages,
      searchTerm: params.navn,
      size: params.size,
      page: params.page,
    },
  };
};

export default HomePage;
