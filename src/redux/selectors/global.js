import { createSelector } from 'reselect';

export const globalSelector = ({ global }) => global;

export const openDrawerSelector = createSelector(
  globalSelector,
  (global) => global?.openDrawer,
);

export const isLoadingSelector = createSelector(
  globalSelector,
  (global) => global?.isLoading,
);
