import { createSelector } from 'reselect';

export const professionalsSelector = ({ professionals }) => professionals;

export const dataSelector = createSelector(
  professionalsSelector,
  (professionals) => professionals?.data,
);

export const formattedDataSelector = createSelector(
  dataSelector,
  (data) => Object.keys(data).reduce((acc, id) => {
    const professional = {
      ...data[id],
      id,
    };
    return [...acc, professional];
  }, []),
);
