/* eslint-disable no-param-reassign */
import { createSlice, createAction } from '@reduxjs/toolkit';

const logIn = createAction('user/logIn');
const logInSuccess = createAction('user/logInSuccess');
const logInError = createAction('user/logInError');
const logOut = createAction('user/logOut');
const logOutSuccess = createAction('user/logOutSuccess');
const logOutError = createAction('user/logOutError');
const sync = createAction('user/sync');

export const user = {
  logIn,
  logInSuccess,
  logInError,
  logOut,
  logOutSuccess,
  logOutError,
  sync,
};

const slice = createSlice({
  name: 'user',
  initialState: {
    data: null,
  },
  reducers: {
    logInSuccess: (state, { payload }) => {
      state.data = payload;
    },
    logOutSuccess: (state) => {
      state.data = null;
    },
  },
});

export default slice.reducer;
