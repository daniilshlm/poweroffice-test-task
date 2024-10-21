import React from 'react';
import SearchBar from '@/components/Search/Search';
import CompanyList from '@/components/CompanyList/CompanyList';
import Pagination from '@/components/Pagination/Pagination';

const HomePage = (): JSX.Element => {
  return (
    <div>
      <h1>Company Search</h1>
      <SearchBar />
      <CompanyList />
      <Pagination />
    </div>
  );
};

export default HomePage;
