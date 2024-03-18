import type { RootState } from '@/app/providers/StoreProvider/config/store';

export const getUsersArray = (state: RootState) => state.findUsersSlice.findUsers;
export const getFindUser = (state: RootState) => state.findUsersSlice.findUser;
export const getUserState = (state: RootState) => state.findUsersSlice.findUser;
