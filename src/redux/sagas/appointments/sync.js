import {
  all, takeLatest, fork, take, cancel,
} from 'redux-saga/effects';
import { appointments } from 'redux/reducers/appointments';
import firebase from 'firebase';
import { user } from 'redux/reducers/user';
import rsf from '../../rsf';

function* callSyncAppointments() {
  while (true) {
    const task = yield fork(
      rsf.database.sync,
      firebase.database().ref('appointments'),
      { successActionCreator: appointments.getSuccess },
    );
    yield take(user.logOut.type);
    yield cancel(task);
  }
}

export default function* watchSyncAppointments() {
  yield all([takeLatest(appointments.sync.type, callSyncAppointments)]);
}
