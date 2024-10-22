import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Company, FetchCompaniesPayload, CompanyState } from '@/types/company';
import { fetchCompaniesFromAPI } from '@/utils/api';

const initialState: CompanyState = {
  companies: [],
  loading: false,
  error: null,
  totalItems: 0,
  totalPages: 1,
};

export const fetchCompanies = createAsyncThunk(
  'company/fetchCompanies',
  async (params: FetchCompaniesPayload) => {
    return fetchCompaniesFromAPI(params);
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    preloadCompanies: (
      state,
      action: PayloadAction<{ companies: Company[]; totalItems: number; totalPages: number }>
    ) => {
      state.companies = action.payload.companies;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCompanies.fulfilled,
        (
          state,
          action: PayloadAction<{ companies: Company[]; totalItems: number; totalPages: number }>
        ) => {
          state.loading = false;
          state.companies = action.payload.companies;
          state.totalItems = action.payload.totalItems;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch companies';
      });
  },
});

export const { preloadCompanies } = companySlice.actions;
export default companySlice.reducer;
