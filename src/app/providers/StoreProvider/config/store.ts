import { configureStore } from '@reduxjs/toolkit';

import curentUserSlice from '@/enteties/session/User/model/slice';
import authenticationFormSlice from '@/features/Authentication/model/slice';
import findUsersSlice from '@/features/UserSearchAutocomplete/model/slice';

export const store = configureStore({
  reducer: {
    authenticationFormSlice: authenticationFormSlice,
    curentUserSlice: curentUserSlice,
    findUsersSlice: findUsersSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
