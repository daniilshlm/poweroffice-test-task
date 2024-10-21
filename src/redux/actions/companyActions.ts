import { Dispatch } from 'redux';
import axios from 'axios';
import { Company, FetchCompaniesPayload } from '@/types/company';
import { AppThunk } from '@/types/reduxTypes';
import {
  FETCH_COMPANIES_REQUEST,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_FAILURE,
} from '@/types/actionTypes';

export const fetchCompanies = ({ search, page, itemsPerPage }: FetchCompaniesPayload): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_COMPANIES_REQUEST });

    try {
      const response = await axios.get(
        `https://data.brreg.no/enhetsregisteret/api/enheter/?navn=${search}&page=${page}&per_page=${itemsPerPage}`
      );

      const companies: Company[] = response.data._embedded.enheter;
      const totalItems: number = response.data.page.totalElements;

      dispatch({
        type: FETCH_COMPANIES_SUCCESS,
        payload: { companies, totalItems },
      });
    } catch (error) {
      dispatch({
        type: FETCH_COMPANIES_FAILURE,
        payload: (error as Error).message,
      });
    }
  };
};
