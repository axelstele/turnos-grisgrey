import { createSelector } from 'reselect';
import keysWithId from 'utils/objects';

export const appointmentsSelector = ({ appointments }) => appointments;

export const dataSelector = createSelector(
  appointmentsSelector,
  (appointments) => appointments?.data,
);

export const formattedDataSelector = createSelector(
  dataSelector,
  (data) => {
    const appointments = keysWithId(data);

    return appointments?.map(
      (appointment) => ({ ...appointment, startDate: Date.parse(appointment.startDate) }),
    );
  },
);
