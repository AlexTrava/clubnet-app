import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import type { DocumentData } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';

import type { RootState } from '@/app/providers/StoreProvider/config/store';
import type { ConfirmationResult } from '@/features/Authentication/model/types';
import { getFirestoreData, setFirestoreData } from '@/shared/api/firebaseApi/firebaseActions';
import {
  convertUserField,
  getAuth,
  getDb,
  setupRecaptcha
} from '@/shared/api/firebaseApi/firebaseAuthActions';
import { githubProvider, googleProvider } from '@/shared/config/firebase/firebase';
import errorHandler from '@/shared/helpers/errorsHandler';

type formTypes = {
  stepForm: string;
  status: string;
};

enum Status {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error'
}

let recaptchaObj: ConfirmationResult;

export const setUserByGithub = createAsyncThunk<
  User | undefined,
  () => void,
  { rejectValue: string }
>('setUserByGithub', async (navigate, { rejectWithValue }) => {
  try {
    const auth = getAuth();
    const { user } = await signInWithPopup(auth, githubProvider);
    console.log(user);
    if (user.displayName === null) {
      return;
      //воткнуть нотифик
    }
    const currentUserUid = getAuth().currentUser?.uid;
    if (currentUserUid === undefined) {
      return;
    }
    const currentUserInfo = convertUserField(user.displayName);
    await setFirestoreData('users', currentUserUid, currentUserInfo);
    navigate();
    return user;
  } catch (error) {
    return rejectWithValue(errorHandler(error, 'Error with Github'));
  }
});

export const setUserByGoogle = createAsyncThunk<
  User | undefined,
  () => void,
  { rejectValue: string }
>('setUserByGoogle', async (navigate, { rejectWithValue }) => {
  try {
    const auth = getAuth();
    const { user } = await signInWithPopup(auth, googleProvider);
    console.log(user);
    if (user.displayName === null) {
      return;
    }
    const currentUserUid = getAuth().currentUser?.uid;
    if (currentUserUid === undefined) {
      return;
    }
    const currentUserInfo = convertUserField(user.displayName);
    await setFirestoreData('users', currentUserUid, currentUserInfo);
    navigate();
    return user;
  } catch (error) {
    return rejectWithValue(errorHandler(error, 'Error with Google'));
  }
});

export const signIn = createAsyncThunk<void, string, { rejectValue: string; state: RootState }>(
  'auth/signPhoneNumber',
  async (phoneNumber: string, { rejectWithValue, dispatch }) => {
    try {
      recaptchaObj = await setupRecaptcha(phoneNumber);
      dispatch(setCurrentStepForm('sms'));
    } catch (error) {
      return rejectWithValue(errorHandler(error, 'signIn Error'));
    }
  }
);

export const handlerVerifyCode = createAsyncThunk<
  DocumentData | void,
  string,
  { rejectValue: string; state: RootState }
>('firestore/handlerVerifyCode', async (smsCode: string, { rejectWithValue, dispatch }) => {
  try {
    await recaptchaObj.confirm(smsCode);
    const currentUserUid = getAuth().currentUser?.uid;
    if (!currentUserUid) {
      return;
    }
    const fetchCurrentUser = await getFirestoreData('users', currentUserUid!);
    if (fetchCurrentUser === null) {
      dispatch(setCurrentStepForm('nick'));
      return;
    }

    if (fetchCurrentUser?.displayName) {
      dispatch(setCurrentStepForm('auth'));
    }

    return fetchCurrentUser;
  } catch (error) {
    return rejectWithValue(errorHandler(error, 'handlerVerifyCode Error'));
  }
});

export const handlerNicknameInput = createAsyncThunk<
  void,
  string,
  { rejectValue: string; state: RootState }
>('firestore/handlerNicknameInput', async (currentDisplayName, { rejectWithValue, dispatch }) => {
  try {
    const currentUserUid = getAuth().currentUser?.uid;
    if (!currentUserUid) {
      errorHandler('currentUserUid error', 'currentUserUid error');
      return;
    }
    const db = getDb();
    const collectionRef = collection(db, 'users');
    const docsQuery = query(collectionRef, where('displayName', '==', currentDisplayName));
    const querySnapshot = await getDocs(docsQuery);
    if (querySnapshot.empty) {
      const currentUserInfo = convertUserField(currentDisplayName);
      await setFirestoreData('users', currentUserUid, currentUserInfo);
      dispatch(setCurrentStepForm('auth'));
      return;
    } else {
      errorHandler('Nickname already been taken', 'handlerNicknameInput Error');
    }
  } catch (error) {
    return rejectWithValue(errorHandler(error, 'handlerVerifyCode Error'));
  }
});

const initialState = {
  stepForm: 'login',
  status: 'loading'
} as formTypes;

const formType = createSlice({
  name: 'formType',
  initialState,
  reducers: {
    setCurrentStepForm(state, action: PayloadAction<string>) {
      state.stepForm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(handlerVerifyCode.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(handlerVerifyCode.fulfilled, (state) => {
      state.status = 'auth';
    });

    builder.addCase(handlerVerifyCode.rejected, (state) => {
      state.status = 'error';
    });

    builder.addCase(handlerNicknameInput.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(handlerNicknameInput.fulfilled, (state) => {
      state.status = 'auth';
    });

    builder.addCase(handlerNicknameInput.rejected, (state) => {
      state.status = 'error';
    });
    builder.addCase(signIn.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(signIn.fulfilled, (state) => {
      state.status = Status.SUCCES;
    });

    builder.addCase(signIn.rejected, (state) => {
      state.status = Status.ERROR;
    });
    builder.addCase(setUserByGithub.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(setUserByGithub.fulfilled, (state) => {
      state.status = Status.SUCCES;
    });

    builder.addCase(setUserByGithub.rejected, (state) => {
      state.status = Status.ERROR;
    });
  }
});

export const { setCurrentStepForm } = formType.actions;

export default formType.reducer;
