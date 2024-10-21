import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Company, FetchCompaniesPayload, CompanyState } from '@/types/company';

const initialState: CompanyState = {
  companies: [],
  loading: false,
  error: null,
  totalItems: 0,
};

export const fetchCompanies = createAsyncThunk(
  'company/fetchCompanies',
  async ({ search }: FetchCompaniesPayload) => {
    const url = `https://data.brreg.no/enhetsregisteret/api/enheter/?${
      search ? `navn=${encodeURIComponent(search)}&` : ''
    }per_page=10`;
    const response = await axios.get(url);
    return {
      companies: response.data._embedded.enheter,
      totalItems: response.data.page.totalElements,
    };
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCompanies.fulfilled,
        (state, action: PayloadAction<{ companies: Company[]; totalItems: number }>) => {
          state.loading = false;
          state.companies = action.payload.companies;
          state.totalItems = action.payload.totalItems;
        }
      )
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch companies';
      });
  },
});

export default companySlice.reducer;
