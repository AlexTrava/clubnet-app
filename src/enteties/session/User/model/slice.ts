import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type CurrentUser = {
  phoneNumber: string;
  smsCode: string;
  displayName: string | null;
  email: null | string;
  github: null | string;
  id: null | string;
  photoURL: null | string;
};

const initialState = {
  phoneNumber: '',
  smsCode: '',
  displayName: null,
  email: null,
  github: null,
  id: null,
  photoURL: null
} as CurrentUser;

const currentUserSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
    },

    setSmsCode(state, action: PayloadAction<string>) {
      state.smsCode = action.payload;
    },

    setDisplayName(state, action: PayloadAction<string | null>) {
      state.displayName = action.payload;
    },
    setGithubInfo(state, action: PayloadAction<string | null>) {
      state.displayName = action.payload;
    },
    setGoogleInfo(state, action: PayloadAction<string | null>) {
      state.displayName = action.payload;
    }
  }
});

export const { setPhoneNumber, setSmsCode, setDisplayName, setGoogleInfo, setGithubInfo } =
  currentUserSlice.actions;

export default currentUserSlice.reducer;
