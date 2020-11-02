import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { appointments } from '../reducers/appointments';
import { global } from '../reducers/global';
import rsf from '../rsf';

function* callSaveAppointment({ payload }) {
  const { title, endDate, startDate } = payload;
  try {
    yield put(global.showLoader());

    yield call(rsf.database.create, 'appointments', {
      title,
      startDate: startDate.toUTCString(),
      endDate: endDate.toUTCString(),
    });
  } catch (error) {
    console.log(error);
  }
  yield put(global.hideLoader());
}

export default function* watchSaveAppointment() {
  yield all([takeLatest(appointments.save.type, callSaveAppointment)]);
}
