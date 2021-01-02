import { createSelector } from 'reselect';
import keysWithId from 'utils/objects';

export const professionalsSelector = ({ professionals }) => professionals;

export const dataSelector = createSelector(
  professionalsSelector,
  (professionals) => professionals?.data,
);

export const formattedDataSelector = createSelector(
  dataSelector,
  (data) => keysWithId(data),
);
