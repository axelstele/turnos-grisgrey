import { all, fork } from 'redux-saga/effects';
import watchLogIn from './login';
import watchLogOut from './logout';
import watchSync from './sync';

export default function* userSagas() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSync),
  ]);
}
