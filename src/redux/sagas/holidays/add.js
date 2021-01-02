import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { global } from 'redux/reducers/global';
import { holidays } from 'redux/reducers/holidays';
import rsf from '../../rsf';

function* callAddHoliday({ payload }) {
  const { description, date } = payload;
  try {
    yield put(global.showLoader());
    yield call(rsf.database.create, 'holidays', {
      description,
      date,
    });
    yield put(holidays.get());
  } catch {
    // TODO handle error
  }
  yield put(global.hideLoader());
}

export default function* watchAddHoliday() {
  yield all([takeLatest(holidays.add.type, callAddHoliday)]);
}
