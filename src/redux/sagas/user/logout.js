import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { user } from 'redux/reducers/user';
import { global } from 'redux/reducers/global';
import rsf from '../../rsf';

function* callLogOut() {
  try {
    yield put(global.showLoader());
    yield call(rsf.auth.signOut);
    yield put(user.logOutSuccess());
  } catch (error) {
    console.log(error);
  }
  yield put(global.hideLoader());
}

export default function* watchLogOut() {
  yield all([takeLatest(user.logOut.type, callLogOut)]);
}
