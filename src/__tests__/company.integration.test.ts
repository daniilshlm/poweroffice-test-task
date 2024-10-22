import { configureStore } from '@reduxjs/toolkit';
import companyReducer, { fetchCompanies } from '@/redux/slices/companySlice';
import { CompanyState } from '@/types/company';
import axios from 'axios';
import { AppDispatch, RootState } from '@/redux/store';
import log from 'loglevel';

jest.mock('axios');
jest.mock('loglevel');

describe('Company API Integration Tests', () => {
  let store: ReturnType<typeof configureStore>;
  let dispatch: AppDispatch;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        company: companyReducer,
      },
    });

    dispatch = store.dispatch as AppDispatch;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful company fetch', async () => {
    const mockCompaniesResponse = {
      data: {
        _embedded: {
          enheter: [{ organisasjonsnummer: '123456789', navn: 'Mock Company' }],
        },
        page: {
          totalElements: 1,
        },
      },
    };

    (axios.get as jest.Mock).mockResolvedValue(mockCompaniesResponse);

    await dispatch(fetchCompanies({ navn: 'Mock Company', size: '10', page: '1' }));

    const state: CompanyState = (store.getState() as RootState).company;

    expect(state.loading).toBe(false);
    expect(state.companies).toEqual([{ organisasjonsnummer: '123456789', navn: 'Mock Company' }]);
    expect(state.totalItems).toBe(1);
    expect(state.totalPages).toBe(1);
    expect(state.error).toBeNull();
  });

  it('should handle failed company fetch with an error', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Failed to fetch companies'));

    await dispatch(fetchCompanies({ navn: 'Invalid Company', size: '10', page: '1' }));

    const state: CompanyState = (store.getState() as RootState).company;

    expect(log.error).toHaveBeenCalledWith('Error fetching companies from API:', expect.any(Error));

    expect(state.loading).toBe(false);
    expect(state.companies).toEqual([]);
    expect(state.totalItems).toBe(0);
    expect(state.totalPages).toBe(1);
    expect(state.error).toBeNull();
  });
});
