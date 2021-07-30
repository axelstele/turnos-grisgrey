/* eslint-disable no-param-reassign */
import { createSlice, createAction } from '@reduxjs/toolkit';

const get = createAction('holidays/get');
const getSuccess = createAction('holidays/getSuccess');
const getError = createAction('holidays/getError');

export const holidays = {
  get,
  getSuccess,
  getError,
};

const slice = createSlice({
  name: 'holidays',
  initialState: {
    data: [],
  },
  reducers: {
    getSuccess: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export default slice.reducer;
