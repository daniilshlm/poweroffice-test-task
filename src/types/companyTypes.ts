import { Company } from '@/types/company';

export interface FetchCompaniesRequestAction {
  type: 'FETCH_COMPANIES_REQUEST';
}

export interface FetchCompaniesSuccessAction {
  type: 'FETCH_COMPANIES_SUCCESS';
  payload: {
    companies: Company[];
    totalItems: number;
  };
}

export interface FetchCompaniesErrorAction {
  type: 'FETCH_COMPANIES_FAILURE';
  payload: string;
}

export type CompanyActions =
  | FetchCompaniesRequestAction
  | FetchCompaniesSuccessAction
  | FetchCompaniesErrorAction;
