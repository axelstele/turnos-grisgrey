import { createSelector } from 'reselect';

export const patientsSelector = ({ patients }) => patients;

export const dataSelector = createSelector(
  patientsSelector,
  (patients) => patients?.data,
);

export const formattedDataSelector = createSelector(
  dataSelector,
  (data) => Object.keys(data).reduce((acc, id) => {
    const patients = {
      ...data[id],
      id,
    };
    return [...acc, patients];
  }, []),
);
