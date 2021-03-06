import { createSelector } from 'reselect';
import keysWithId from 'utils/objects';

export const patientsSelector = ({ patients }) => patients;

export const dataSelector = createSelector(
  patientsSelector,
  (patients) => patients?.data,
);

export const formattedDataSelector = createSelector(
  dataSelector,
  (data) => keysWithId(data),
);
