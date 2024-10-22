import { FetchCompaniesPayload } from '@/types/company';

const buildQueryParams = (params: FetchCompaniesPayload): string => {
  const queryEntries = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`);
  return queryEntries.join('&');
};

export default buildQueryParams;
