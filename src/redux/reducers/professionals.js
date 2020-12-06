/* eslint-disable no-param-reassign */
import { createSlice, createAction } from '@reduxjs/toolkit';

const add = createAction('professionals/add');
const addSuccess = createAction('professionals/addSuccess');
const addError = createAction('professionals/addError');
const edit = createAction('professionals/edit');
const editSuccess = createAction('professionals/editSuccess');
const editError = createAction('professionals/editError');
const get = createAction('professionals/get');
const getSuccess = createAction('professionals/getSuccess');
const getError = createAction('professionals/getError');
const remove = createAction('professionals/remove');
const removeSuccess = createAction('professionals/removeSuccess');
const removeError = createAction('professionals/removeError');

export const professionals = {
  add,
  addSuccess,
  addError,
  edit,
  editSuccess,
  editError,
  get,
  getSuccess,
  getError,
  remove,
  removeSuccess,
  removeError,
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
