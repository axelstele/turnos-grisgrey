import {
  all, takeLatest, call, take, put,
} from 'redux-saga/effects';
import { user } from 'redux/reducers/user';
import { push } from 'connected-react-router';
import { global } from 'redux/reducers/global';
import rsf from '../../rsf';

function* callSync() {
  try {
    const channel = yield call(rsf.auth.channel);
    yield put(global.showLoader());
    while (true) {
      const response = yield take(channel);
      if (response.user) {
        yield put(user.logInSuccess(response.user));
        yield put(push('/home'));
        return;
      }
      yield put(user.logInSuccess(null));
      yield put(push('/'));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(global.hideLoader());
}

export default function* watchSync() {
  yield all([takeLatest(user.sync.type, callSync)]);
}
