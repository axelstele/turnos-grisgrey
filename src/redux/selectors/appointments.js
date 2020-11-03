import { createSelector } from 'reselect';

export const appointmentsSelector = ({ appointments }) => appointments;

export const dataSelector = createSelector(
  appointmentsSelector,
  (appointments) => appointments?.data,
);

export const formattedDataSelector = createSelector(
  dataSelector,
  (data) => {
    const parsedAppointments = Object.keys(data).reduce((acc, id) => {
      const appointment = {
        ...data[id],
        id,
      };
      return [...acc, appointment];
    }, []);

    // eslint-disable-next-line max-len
    return parsedAppointments.map((appointment) => ({ ...appointment, startDate: Date.parse(appointment.startDate) }));
  },
);
