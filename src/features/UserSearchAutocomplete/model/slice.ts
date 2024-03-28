import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/app/providers/StoreProvider/config/store';
import { findUsersDatabase } from '@/shared/api/firebaseApi/firebaseActions';
import errorHandler from '@/shared/helpers/errorsHandler';
import { Status } from '@/shared/types/enums';

type findUsers = {
  displayName: string | null;
  photo: string | null;
  id: string | null;
};

type initialStateType = {
  findUsers: findUsers[];
  findUser: string;
  status: string;
};

export const handlerSearchUserInput = createAsyncThunk<
  { displayName: string | null; photo: string | null; id: string | null }[],
  string,
  { rejectValue: string; state: RootState }
>('firestore/handlerSearchUserInput', async (currentDisplayName, { rejectWithValue }) => {
  try {
    const user = await findUsersDatabase('users', 'displayName', currentDisplayName);
    return user
      .filter((item) => item.displayName?.toLowerCase().includes(currentDisplayName.toLowerCase()))
      .map((item) => {
        return { displayName: item.displayName, photo: item.photoURL, id: item.uid };
      });
  } catch (error) {
    return rejectWithValue(errorHandler(error, 'handlerVerifyCode Error'));
  }
});

const initialState = {
  findUsers: [],
  findUser: '',
  status: 'loading'
} as initialStateType;

const findUsers = createSlice({
  name: 'findUsers',
  initialState,
  reducers: {
    setClearSearchImputOnClose(state) {
      state.findUsers = [];
    },
    setClearSearchImputCloseButton(state) {
      state.findUsers = [];
      state.findUser = '';
    },
    setFindUser(state, action: PayloadAction<string>) {
      state.findUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(handlerSearchUserInput.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(handlerSearchUserInput.fulfilled, (state, action) => {
      state.findUsers = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(handlerSearchUserInput.rejected, (state) => {
      state.status = Status.ERROR;
    });
  }
});

export const { setClearSearchImputOnClose, setClearSearchImputCloseButton, setFindUser } =
  findUsers.actions;

export default findUsers.reducer;
