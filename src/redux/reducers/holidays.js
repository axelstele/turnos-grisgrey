/* eslint-disable no-param-reassign */
import { createSlice, createAction } from '@reduxjs/toolkit';

const add = createAction('holidays/add');
const addSuccess = createAction('holidays/addSuccess');
const addError = createAction('holidays/addError');
const edit = createAction('holidays/edit');
const editSuccess = createAction('holidays/editSuccess');
const editError = createAction('holidays/editError');
const get = createAction('holidays/get');
const getSuccess = createAction('holidays/getSuccess');
const getError = createAction('holidays/getError');
const remove = createAction('holidays/remove');
const removeSuccess = createAction('holidays/removeSuccess');
const removeError = createAction('holidays/removeError');

export const holidays = {
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
