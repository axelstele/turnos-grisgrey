import { createSelector } from 'reselect';
import keysWithId from 'utils/objects';

export const holidaysSelector = ({ holidays }) => holidays;

export const dataSelector = createSelector(
  holidaysSelector,
  (holidays) => holidays?.data,
);

export const formattedDataSelector = createSelector(
  dataSelector,
  (data) => keysWithId(data),
);
