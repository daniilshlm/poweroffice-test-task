import React, { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCompanies } from '@/redux/slices/companySlice';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/router';
import { FetchCompaniesPayload } from '@/types/company';
import { Button } from '@rewind-ui/core';

interface SearchBarProps {
  initialSearchTerm: string;
  initialSize: string;
}

const SearchBar = ({ initialSearchTerm, initialSize }: SearchBarProps): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [otherFilters, setOtherFilters] = useState({
    size: initialSize,
  });

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    setOtherFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmitSearch = (): void => {
    const query = {
      navn: searchTerm || undefined,
      size: otherFilters.size,
      page: '1',
    };

    router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
    dispatch(fetchCompanies(query as FetchCompaniesPayload));
  };

  useEffect(() => {
    if (router.query.navn !== undefined) {
      setSearchTerm(router.query.navn as string);
    }
    setOtherFilters({
      size: (router.query.size as string) || '10',
    });
  }, [router.query]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name..."
      />

      <input
        type="number"
        name="size"
        value={otherFilters.size}
        onChange={handleFilterChange}
        placeholder="Items per page"
      />

      <Button color="blue" onClick={handleSubmitSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
