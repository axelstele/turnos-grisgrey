/* eslint-disable no-param-reassign */
import { createSlice, createAction } from '@reduxjs/toolkit';

const get = createAction('appointments/get');
const getSuccess = createAction('appointments/getSuccess');
const getError = createAction('appointments/getError');
const remove = createAction('appointments/remove');
const removeSuccess = createAction('appointments/removeSuccess');
const removeError = createAction('appointments/removeError');
const save = createAction('appointments/save');
const saveSuccess = createAction('appointments/saveSuccess');
const saveError = createAction('appointments/saveError');
const sync = createAction('appointments/sync');
const update = createAction('appointments/update');
const updateSuccess = createAction('appointments/updateSuccess');
const updateError = createAction('appointments/updateError');

export const appointments = {
  remove,
  removeSuccess,
  removeError,
  get,
  getSuccess,
  getError,
  save,
  saveSuccess,
  saveError,
  sync,
  update,
  updateSuccess,
  updateError,
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
