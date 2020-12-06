import {
  all, takeLatest, put, call,
} from 'redux-saga/effects';
import { practices } from 'redux/reducers/practices';
import rsf from '../../rsf';

export function* callGetPractices() {
  const response = yield call(rsf.database.read, 'practices');
  yield put(practices.getSuccess(response || []));
}

export default function* watchGetPractices() {
  yield all([takeLatest(practices.get.type, callGetPractices)]);
}
