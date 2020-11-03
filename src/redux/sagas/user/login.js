import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { user } from 'redux/reducers/user';
import { global } from 'redux/reducers/global';
import rsf from '../../rsf';

function* callLogIn({ payload }) {
  const { email, password } = payload;
  try {
    yield put(global.showLoader());
    yield call(rsf.auth.signInWithEmailAndPassword, email, password);
  } catch (error) {
    console.log(error);
  }
  yield put(global.hideLoader());
}

export default function* watchLogIn() {
  yield all([takeLatest(user.logIn.type, callLogIn)]);
}
