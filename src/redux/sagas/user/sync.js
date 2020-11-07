import {
  all, takeLatest, call, take, put,
} from 'redux-saga/effects';
import { user } from 'redux/reducers/user';
import { push } from 'connected-react-router';
import { global } from 'redux/reducers/global';
import { LOGIN_PATHNAME, HOME_PATHNAME } from 'constants/routes';
import rsf from '../../rsf';

function* callSync() {
  yield put(global.showLoader());
  const pathName = document.location.pathname;
  const channel = yield call(rsf.auth.channel);
  while (true) {
    const response = yield take(channel);
    if (response.user) {
      yield put(user.logInSuccess(response.user));
      if (pathName === LOGIN_PATHNAME) {
        yield put(push(HOME_PATHNAME));
      } else {
        yield put(push(pathName));
      }
    } else {
      yield put(user.logInSuccess(null));
      yield put(push(LOGIN_PATHNAME));
    }
    yield put(global.hideLoader());
  }
}

export default function* watchSync() {
  yield all([takeLatest(user.sync.type, callSync)]);
}
