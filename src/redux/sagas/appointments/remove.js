import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { global } from 'redux/reducers/global';
import { appointments } from 'redux/reducers/appointments';
import rsf from '../../rsf';

function* callRemoveAppointment({ payload }) {
  const { id } = payload;
  try {
    yield put(global.showLoader());
    yield call(rsf.database.delete, `appointments/${id}`);
  } catch (error) {
    console.log(error);
  }
  yield put(global.hideLoader());
}

export default function* watchRemoveAppointment() {
  yield all([takeLatest(appointments.remove.type, callRemoveAppointment)]);
}
