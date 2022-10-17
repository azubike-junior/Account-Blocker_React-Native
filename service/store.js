import { Action, configureStore, combineReducers, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import  validateAccount from './nameEnquiry';
import blockAccountNumber from './blockAccount';
import loginUser from './login'


export const store = configureStore({
  reducer: {
    validateAccount,
    blockAccountNumber,
    loginUser
  },
  middleware: (gdm) =>
    gdm({
      serializableCheck: false,
    }),
  devTools: true,
});

setupListeners(store.dispatch);
