import {
  all, takeLatest, put, call,
} from 'redux-saga/effects';
import { appointments } from 'redux/reducers/appointments';
import rsf from '../../rsf';

export function* callGetAppointments() {
  try {
    const response = yield call(rsf.database.read, 'appointments');
    yield put(appointments.getSuccess(response));
  } catch {
    // TODO handle error
  }
}

export default function* watchGetAppointments() {
  yield all([takeLatest(appointments.get.type, callGetAppointments)]);
}
