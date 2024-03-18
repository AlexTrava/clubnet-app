import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type CurrentUser = {
  phoneNumber: string;
  smsCode: string;
  displayName: string;
};

const initialState = {
  phoneNumber: '',
  smsCode: '',
  displayName: ''
} as CurrentUser;

const curentUserSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
    },

    setSmsCode(state, action: PayloadAction<string>) {
      state.smsCode = action.payload;
    },

    setDisplayName(state, action: PayloadAction<string>) {
      state.displayName = action.payload;
    }
  }
});

export const { setPhoneNumber, setSmsCode, setDisplayName } = curentUserSlice.actions;

export default curentUserSlice.reducer;
