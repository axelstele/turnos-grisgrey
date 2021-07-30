import { createSelector } from 'reselect';

export const holidaysSelector = ({ holidays }) => holidays;

export const dataSelector = createSelector(
  holidaysSelector,
  (holidays) => holidays?.data,
);
