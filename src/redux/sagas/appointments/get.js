import {
  all, takeLatest, select, put, call,
} from 'redux-saga/effects';
import { appointments } from 'redux/reducers/appointments';
import { global } from 'redux/reducers/global';
import { uidSelector } from 'redux/selectors/user';
import firebase from 'firebase';
import rsf from '../../rsf';

function* callGetAppointments() {
  try {
    yield put(global.showLoader());
    const uid = yield select(uidSelector);
    const response = yield call(
      rsf.database.read,
      firebase.database().ref('appointments').orderByChild('uid').equalTo(uid),
    );
    yield put(appointments.getSuccess(response));
  } catch (error) {
    console.log(error);
  }
  yield put(global.hideLoader());
  yield put(appointments.sync());
}

export default function* watchGetAppointments() {
  yield all([takeLatest(appointments.get.type, callGetAppointments)]);
}
