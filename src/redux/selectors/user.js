import { createSelector } from 'reselect';

export const userSelector = ({ user }) => user;

export const dataSelector = createSelector(
  userSelector,
  (user) => user?.data,
);

export const uidSelector = createSelector(
  dataSelector,
  (data) => data?.uid,
);
