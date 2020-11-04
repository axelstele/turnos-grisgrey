import {
  all, takeLatest, put, call,
} from 'redux-saga/effects';
import { professionals } from 'redux/reducers/professionals';
import rsf from '../../rsf';

export function* callGetProfessionals() {
  const response = yield call(rsf.database.read, 'professionals');
  yield put(professionals.getSuccess(response));
}

export default function* watchGetProfessionals() {
  yield all([takeLatest(professionals.get.type, callGetProfessionals)]);
}
