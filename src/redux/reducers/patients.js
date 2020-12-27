/* eslint-disable no-param-reassign */
import { createSlice, createAction } from '@reduxjs/toolkit';

const add = createAction('patients/add');
const addSuccess = createAction('patients/addSuccess');
const addError = createAction('patients/addError');
const edit = createAction('patients/edit');
const editSuccess = createAction('patients/editSuccess');
const editError = createAction('patients/editError');
const get = createAction('patients/get');
const getSuccess = createAction('patients/getSuccess');
const getError = createAction('patients/getError');
const remove = createAction('patients/remove');
const removeSuccess = createAction('patients/removeSuccess');
const removeError = createAction('patients/removeError');

export const patients = {
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
  name: 'patients',
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
