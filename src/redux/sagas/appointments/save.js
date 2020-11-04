import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { global } from 'redux/reducers/global';
import { appointments } from 'redux/reducers/appointments';
import rsf from '../../rsf';

function* callSaveAppointment({ payload }) {
  const {
    title, endDate, startDate, professional,
  } = payload;
  try {
    yield put(global.showLoader());
    yield call(rsf.database.create, 'appointments', {
      title,
      startDate: startDate.toUTCString(),
      endDate: endDate.toUTCString(),
      professional,
    });
  } catch {
    // TODO handle error
  }
  yield put(global.hideLoader());
}

export default function* watchSaveAppointment() {
  yield all([takeLatest(appointments.save.type, callSaveAppointment)]);
}
