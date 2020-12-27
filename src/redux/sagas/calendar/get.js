import {
  all, takeLatest, put, call,
} from 'redux-saga/effects';
import { calendar } from 'redux/reducers/calendar';
import { appointments } from 'redux/reducers/appointments';
import { callGetAppointments } from 'redux/sagas/appointments/get';
import { callGetPatients } from 'redux/sagas/patients/get';
import { callGetProfessionals } from 'redux/sagas/professionals/get';
import { callGetPractices } from 'redux/sagas/practices/get';
import { global } from 'redux/reducers/global';

function* callGetCalendar() {
  yield put(global.showLoader());
  try {
    yield all([
      call(callGetAppointments),
      call(callGetPatients),
      call(callGetProfessionals),
      call(callGetPractices),
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
