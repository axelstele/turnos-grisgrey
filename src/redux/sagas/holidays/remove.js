import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { global } from 'redux/reducers/global';
import { holidays } from 'redux/reducers/holidays';
import rsf from '../../rsf';

function* callRemoveHolidays({ payload }) {
  const { selectedRows } = payload;

  try {
    yield put(global.showLoader());
    yield all(selectedRows.map((holiday) => call(rsf.database.delete, `holidays/${holiday.id}`)));
    yield put(holidays.get());
  } catch {
    // TODO handle error
  }
  yield put(global.hideLoader());
}

export default function* watchRemoveHolidays() {
  yield all([takeLatest(holidays.remove.type, callRemoveHolidays)]);
}
