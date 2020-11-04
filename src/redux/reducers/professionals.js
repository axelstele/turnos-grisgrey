/* eslint-disable no-param-reassign */
import { createSlice, createAction } from '@reduxjs/toolkit';

const get = createAction('professionals/get');
const getSuccess = createAction('professionals/getSuccess');
const getError = createAction('professionals/getError');
const add = createAction('professionals/add');
const addSuccess = createAction('professionals/addSuccess');
const addError = createAction('professionals/addError');

export const professionals = {
  get,
  getSuccess,
  getError,
  add,
  addSuccess,
  addError,
};

const slice = createSlice({
  name: 'professionals',
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
