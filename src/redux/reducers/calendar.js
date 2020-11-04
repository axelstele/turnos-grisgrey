/* eslint-disable no-param-reassign */
import { createSlice, createAction } from '@reduxjs/toolkit';

const get = createAction('calendar/get');
const getSuccess = createAction('calendar/getSuccess');
const getError = createAction('calendar/getError');

export const calendar = {
  get,
  getSuccess,
  getError,
};

const slice = createSlice({
  name: 'calendar',
  initialState: {},
  reducers: {},
});

export default slice.reducer;
