import {
  all, takeLatest, call, put, select,
} from 'redux-saga/effects';
import { global } from 'redux/reducers/global';
import { appointments } from 'redux/reducers/appointments';
import { uidSelector } from 'redux/selectors/user';
import rsf from '../../rsf';

function* callSaveAppointment({ payload }) {
  const { title, endDate, startDate } = payload;
  try {
    yield put(global.showLoader());
    const uid = yield select(uidSelector);
    yield call(rsf.database.create, 'appointments', {
      uid,
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
