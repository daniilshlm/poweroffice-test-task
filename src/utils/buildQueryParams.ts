import { FetchCompaniesPayload } from '@/types/company';

const buildQueryParams = (params: FetchCompaniesPayload): string => {
  const query = new URLSearchParams();

  if (params.navn) {
    query.append('navn', params.navn);
  }

  if (params.organisasjonsnummer) {
    query.append('organisasjonsnummer', params.organisasjonsnummer);
  }

  if (params.sort) {
    query.append('sort', params.sort);
  }

  query.append('size', params.size || '10');
  query.append('page', params.page || '1');

  return query.toString();
};

export default buildQueryParams;
