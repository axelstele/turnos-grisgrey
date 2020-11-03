import {
  all, takeLatest, fork, select, take, cancel,
} from 'redux-saga/effects';
import { appointments } from 'redux/reducers/appointments';
import { uidSelector } from 'redux/selectors/user';
import firebase from 'firebase';
import { user } from 'redux/reducers/user';
import rsf from '../../rsf';

function* callSyncAppointments() {
  while (true) {
    const uid = yield select(uidSelector);
    const task = yield fork(
      rsf.database.sync,
      firebase.database().ref('appointments').orderByChild('uid').equalTo(uid),
      { successActionCreator: appointments.getSuccess },
    );
    yield take(user.logOut.type);
    yield cancel(task);
  }
}

export default function* watchGetAppointments() {
  yield all([takeLatest(appointments.sync.type, callSyncAppointments)]);
}
