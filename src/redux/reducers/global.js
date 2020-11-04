/* eslint-disable no-param-reassign */
import { createSlice, createAction } from '@reduxjs/toolkit';

const hideDrawer = createAction('global/hideDrawer');
const hideLoader = createAction('global/hideLoader');
const showDrawer = createAction('global/showDrawer');
const showLoader = createAction('global/showLoader');

export const global = {
  hideDrawer,
  hideLoader,
  showDrawer,
  showLoader,
};

const slice = createSlice({
  name: 'global',
  initialState: {
    isLoading: false,
    openDrawer: false,
  },
  reducers: {
    hideDrawer: (state) => {
      state.openDrawer = false;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
    showDrawer: (state) => {
      state.openDrawer = true;
    },
    showLoader: (state) => {
      state.isLoading = true;
    },
  },
});

export default slice.reducer;
