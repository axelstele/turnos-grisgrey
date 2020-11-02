/* eslint-disable no-param-reassign */
import { createSlice, createAction } from '@reduxjs/toolkit';

const showLoader = createAction('global/showLoader');
const hideLoader = createAction('global/hideLoader');

export const global = {
  showLoader,
  hideLoader,
};

const slice = createSlice({
  name: 'global',
  initialState: {
    isLoading: false,
  },
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
  },
});

export default slice.reducer;
