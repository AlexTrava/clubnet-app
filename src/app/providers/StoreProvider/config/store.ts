import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import curentUserSlice from '@/enteties/session/User/model/slice';
import authenticationFormSlice from '@/features/Authentication/model/slice';
import findUsersSlice from '@/features/UserSearchAutocomplete/model/slice';

const rootReducer = combineReducers({
  authenticationFormSlice: authenticationFormSlice,
  curentUserSlice: curentUserSlice,
  findUsersSlice: findUsersSlice
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['findUsersSlice']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});
export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
