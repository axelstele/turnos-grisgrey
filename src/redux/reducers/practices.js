/* eslint-disable no-param-reassign */
import { createSlice, createAction } from '@reduxjs/toolkit';

const add = createAction('practices/add');
const addSuccess = createAction('practices/addSuccess');
const addError = createAction('practices/addError');
const edit = createAction('practices/edit');
const editSuccess = createAction('practices/editSuccess');
const editError = createAction('practices/editError');
const get = createAction('practices/get');
const getSuccess = createAction('practices/getSuccess');
const getError = createAction('practices/getError');
const remove = createAction('practices/remove');
const removeSuccess = createAction('practices/removeSuccess');
const removeError = createAction('practices/removeError');

export const practices = {
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
  name: 'practices',
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
