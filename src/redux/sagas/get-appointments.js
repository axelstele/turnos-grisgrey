import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { appointments } from '../reducers/appointments';
import { global } from '../reducers/global';
import rsf from '../rsf';

function* callGetAppointments() {
  try {
    yield put(global.showLoader());
    const response = yield call(rsf.database.read, 'appointments');
    const parsedAppointments = Object.keys(response).reduce((acc, id) => {
      const appointment = {
        ...response[id],
        id,
      };
      return [...acc, appointment];
    }, []);

    // eslint-disable-next-line max-len
    parsedAppointments.map((appointment) => ({ ...appointment, startDate: Date.parse(appointment.startDate) }));
    yield put(appointments.getSuccess(parsedAppointments));
  } catch (error) {
    console.log(error);
  }
  yield put(global.hideLoader());
}

export default function* watchGetAppointments() {
  yield all([takeLatest(appointments.get.type, callGetAppointments)]);
}
