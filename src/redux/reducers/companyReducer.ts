import {
  FETCH_COMPANIES_REQUEST,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_FAILURE,
} from '@/types/actionTypes';
import { CompanyState } from '@/types/company';
import { CompanyActions } from '@/types/companyTypes';

const initialState: CompanyState = {
  companies: [],
  loading: false,
  error: null,
  totalItems: 0,
};

const companyReducer = (state = initialState, action: CompanyActions): CompanyState => {
  switch (action.type) {
    case FETCH_COMPANIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COMPANIES_SUCCESS:
      return {
        ...state,
        loading: false,
        companies: action.payload.companies,
        totalItems: action.payload.totalItems,
      };
    case FETCH_COMPANIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default companyReducer;
