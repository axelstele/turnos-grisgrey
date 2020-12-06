import { createSelector } from 'reselect';

export const practicesSelector = ({ practices }) => practices;

export const dataSelector = createSelector(
  practicesSelector,
  (practices) => practices?.data,
);

export const formattedDataSelector = createSelector(
  dataSelector,
  (data) => Object.keys(data).reduce((acc, id) => {
    const practices = {
      ...data[id],
      id,
    };
    return [...acc, practices];
  }, []),
);
