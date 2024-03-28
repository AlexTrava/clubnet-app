import type { RootState } from '@/app/providers/StoreProvider/config/store';

export const getUser = (state: RootState) => state.authenticationFormSlice.user;
