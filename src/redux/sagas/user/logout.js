import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { user } from 'redux/reducers/user';
import { global } from 'redux/reducers/global';
import { push } from 'connected-react-router';
import { LOGIN_PATHNAME } from 'constants/routes';
import rsf from '../../rsf';

function* callLogOut() {
  try {
    yield put(global.showLoader());
    yield call(rsf.auth.signOut);
    yield put(user.logOutSuccess());
    yield put(push(LOGIN_PATHNAME));
  } catch {
    // TODO handle error
  }
  yield put(global.hideLoader());
}

export default function* watchLogOut() {
  yield all([takeLatest(user.logOut.type, callLogOut)]);
}
