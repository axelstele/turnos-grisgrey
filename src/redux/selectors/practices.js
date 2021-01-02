import { createSelector } from 'reselect';
import keysWithId from 'utils/objects';

export const practicesSelector = ({ practices }) => practices;

export const dataSelector = createSelector(
  practicesSelector,
  (practices) => practices?.data,
);

export const formattedDataSelector = createSelector(
  dataSelector,
  (data) => keysWithId(data),
);
