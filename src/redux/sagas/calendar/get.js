import {
  all, takeLatest, put, call,
} from 'redux-saga/effects';
import { calendar } from 'redux/reducers/calendar';
import { appointments } from 'redux/reducers/appointments';
import { callGetAppointments } from 'redux/sagas/appointments/get';
import { callGetProfessionals } from 'redux/sagas/professionals/get';
import { global } from 'redux/reducers/global';

function* callGetCalendar() {
  try {
    yield put(global.showLoader());
    yield all([
      call(callGetAppointments),
      call(callGetProfessionals),
    ]);
  } catch {
    // TODO handle error
  }
  yield put(global.hideLoader());
  yield put(appointments.sync());
}

export default function* watchGetCalendar() {
  yield all([takeLatest(calendar.get.type, callGetCalendar)]);
}
