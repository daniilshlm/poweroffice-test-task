import axios from 'axios';
import { Company, FetchCompaniesPayload } from '@/types/company';
import buildQueryParams from '@/utils/buildQueryParams';
import log from 'loglevel';

interface FetchCompaniesAPIResponse {
  companies: Company[];
  totalItems: number;
  totalPages: number;
}

export const fetchCompaniesFromAPI = async (
  params: FetchCompaniesPayload
): Promise<FetchCompaniesAPIResponse> => {
  const queryParams = buildQueryParams(params);
  const url = `https://data.brreg.no/enhetsregisteret/api/enheter/?${queryParams}`;

  try {
    const response = await axios.get(url);

    const totalItems = response.data.page?.totalElements || 0;
    const size = parseInt(params.size || '10', 10);

    return {
      companies: response.data._embedded?.enheter || [],
      totalItems,
      totalPages: Math.ceil(totalItems / size),
    };
  } catch (error) {
    log.error('Error fetching companies from API:', error);
    return {
      companies: [],
      totalItems: 0,
      totalPages: 1,
    };
  }
};
