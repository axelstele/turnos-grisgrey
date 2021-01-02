import { all, fork } from 'redux-saga/effects';
import watchAddHoliday from './add';
import watchEditHoliday from './edit';
import watchGetHolidays from './get';
import watchRemoveHolidays from './remove';

export default function* holidaysSagas() {
  yield all([
    fork(watchAddHoliday),
    fork(watchEditHoliday),
    fork(watchGetHolidays),
    fork(watchRemoveHolidays),
  ]);
}
