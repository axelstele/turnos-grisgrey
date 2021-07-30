import { all, fork } from 'redux-saga/effects';
import watchGetHolidays from './get';

export default function* holidaysSagas() {
  yield all([fork(watchGetHolidays)]);
}
