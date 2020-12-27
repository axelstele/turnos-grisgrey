import {
  all, takeLatest, put, call,
} from 'redux-saga/effects';
import { patients } from 'redux/reducers/patients';
import rsf from '../../rsf';

export function* callGetPatients() {
  const response = yield call(rsf.database.read, 'patients');
  yield put(patients.getSuccess(response || []));
}

export default function* watchGetPatients() {
  yield all([takeLatest(patients.get.type, callGetPatients)]);
}
