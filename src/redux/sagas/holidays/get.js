import {
  all, takeLatest, put, call,
} from 'redux-saga/effects';
import { holidays } from 'redux/reducers/holidays';
import rsf from '../../rsf';

export function* callGetHolidays() {
  const response = yield call(rsf.database.read, 'holidays');
  yield put(holidays.getSuccess(response || []));
}

export default function* watchGetHolidays() {
  yield all([takeLatest(holidays.get.type, callGetHolidays)]);
}
