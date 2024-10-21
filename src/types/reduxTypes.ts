import { ThunkAction } from 'redux-thunk';
import { RootState } from '@/redux/store';
import { CompanyActions } from '@/types/companyTypes';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  CompanyActions
>;
