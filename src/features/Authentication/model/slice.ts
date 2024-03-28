import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithPopup } from 'firebase/auth';
import type { DocumentData } from 'firebase/firestore';
import { collection, doc, getDoc } from 'firebase/firestore';

import type { RootState } from '@/app/providers/StoreProvider/config/store';
import type { ConfirmationResult, UserForDB } from '@/features/Authentication/model/types';
import {
  getFirestoreData,
  setFirestoreData,
  updateFirestoreData
} from '@/shared/api/firebaseApi/firebaseActions';
import {
  getAuth,
  getGithubAuth,
  setupRecaptcha
} from '@/shared/api/firebaseApi/firebaseAuthActions';
import { db, googleProvider } from '@/shared/config/firebase/firebase';
import errorHandler from '@/shared/helpers/errorsHandler';

type formTypes = {
  stepForm: string;
  status: string;
  user: DocumentData | UserForDB;
};

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

let recaptchaObj: ConfirmationResult;

export const setUserByGithub = createAsyncThunk(
  'setUserByGithub',
  async (navigate: () => void, { rejectWithValue, dispatch }) => {
    try {
      const { user } = await getGithubAuth();
      const { uid, metadata } = user;
      const userDocRef = doc(collection(db, 'users'), uid); // Создаем ссылку на документ пользователя в БД
      const docSnapshot = await getDoc(userDocRef); // Проверяем, существует ли пользователь с заданным user.uid

      if (!uid) {
        errorHandler('ID error', 'There is no ID');
        return;
      }

      if (docSnapshot.exists()) {
        // Если user существует
        const fetchCurrentUser = await getFirestoreData('users', uid); // Получаем user по uid
        // console.log(fetchCurrentUser);
        navigate();
        return fetchCurrentUser;
      } else {
        const userForDB: UserForDB = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          dateOfRegistration: metadata.creationTime
        };
        await setFirestoreData('users', uid, userForDB);
        dispatch(setCurrentStepForm('nick'));
        return userForDB;
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, 'Error with Github'));
    }
  }
);

export const setUserByGoogle = createAsyncThunk(
  'setUserByGoogle',
  async (navigate: () => void, { rejectWithValue, dispatch }) => {
    try {
      const auth = getAuth();
      const { user } = await signInWithPopup(auth, googleProvider);
      const { uid, metadata } = user;
      const userDocRef = doc(collection(db, 'users'), uid); // Создаем ссылку на документ пользователя в БД
      const docSnapshot = await getDoc(userDocRef); // Проверяем, существует ли пользователь с заданным user.uid

      if (!uid) {
        errorHandler('ID error', 'There is no ID');
        return;
      }

      if (docSnapshot.exists()) {
        // Если user существует
        const fetchCurrentUser = await getFirestoreData('users', uid); // Получаем user по uid
        navigate();
        return fetchCurrentUser;
      } else {
        const userForDB: UserForDB = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          dateOfRegistration: metadata.creationTime,
          phoneNumber: user.phoneNumber
        };
        await setFirestoreData('users', uid, userForDB);
        dispatch(setCurrentStepForm('nick'));
        return userForDB;
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, 'Error with Google'));
    }
  }
);

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

export const handlerVerifyCode = createAsyncThunk(
  'firestore/handlerVerifyCode',
  async (smsCode: string, { rejectWithValue, dispatch }) => {
    try {
      await recaptchaObj.confirm(smsCode);
      const creationTime = getAuth().currentUser?.metadata.creationTime;
      const phoneNumber = getAuth().currentUser?.phoneNumber;
      const uid = getAuth().currentUser?.uid;

      if (!uid) {
        return;
      }

      const userDocRef = doc(collection(db, 'users'), uid); // Создаем ссылку на документ пользователя в БД
      const docSnapshot = await getDoc(userDocRef); // Проверяем, существует ли пользователь с заданным user.uid

      if (docSnapshot.exists()) {
        const fetchCurrentUser = await getFirestoreData('users', uid);
        dispatch(setCurrentStepForm('auth'));
        return fetchCurrentUser;
      } else {
        const userForDB: UserForDB = {
          email: null,
          displayName: null,
          photoURL: null,
          dateOfRegistration: creationTime,
          nickName: null,
          phoneNumber: phoneNumber,
          id: uid
        };
        await setFirestoreData('users', uid, userForDB);
        dispatch(setCurrentStepForm('nick'));
        return userForDB;
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, 'handlerVerifyCode Error'));
    }
  }
);

export const handlerNicknameInput = createAsyncThunk(
  'firestore/handlerNicknameInput',
  async (nickName: string, { dispatch }) => {
    const uid = getAuth().currentUser?.uid;

    if (!uid) {
      errorHandler('currentUserUid error', 'currentUserUid error');
      return;
    }
    const partialUserData = { nickName: nickName };
    await updateFirestoreData('users', uid, partialUserData); //обновить только nickName
    dispatch(setCurrentStepForm('auth'));
    return partialUserData;
  }
);

const initialState = {
  stepForm: 'login',
  status: 'loading',
  user: {}
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

    builder.addCase(handlerVerifyCode.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload;
        state.status = 'auth';
      }
      state.status = 'auth';
    });

    builder.addCase(handlerVerifyCode.rejected, (state) => {
      state.status = 'error';
    });

    builder.addCase(handlerNicknameInput.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(handlerNicknameInput.fulfilled, (state, { payload }) => {
      if (payload) {
        const { nickName } = payload;
        console.log(nickName);
        state.user.nickName = nickName;
        state.status = 'auth';
      }
    });
    builder.addCase(handlerNicknameInput.rejected, (state) => {
      state.status = 'error';
    });

    builder.addCase(signIn.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(signIn.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(setUserByGithub.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(setUserByGithub.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload;
        state.status = Status.SUCCESS;
      }
    });
    builder.addCase(setUserByGoogle.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload;
        state.status = Status.SUCCESS;
      }
    });
  }
});

export const { setCurrentStepForm } = formType.actions;

export default formType.reducer;
