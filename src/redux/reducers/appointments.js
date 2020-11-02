/* eslint-disable no-param-reassign */
import { createSlice, createAction } from '@reduxjs/toolkit';

const get = createAction('appointments/get');
const getSuccess = createAction('appointments/getSuccess');
const getError = createAction('appointments/getError');
const save = createAction('appointments/save');
const saveSuccess = createAction('appointments/saveSuccess');
const saveError = createAction('appointments/saveError');

export const appointments = {
  get,
  getSuccess,
  getError,
  save,
  saveSuccess,
  saveError,
};

const slice = createSlice({
  name: 'appointments',
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
