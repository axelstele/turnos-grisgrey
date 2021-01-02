import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { global } from 'redux/reducers/global';
import { holidays } from 'redux/reducers/holidays';
import rsf from '../../rsf';

function* callEditHoliday({ payload }) {
  const {
    id, description, date,
  } = payload;
  try {
    yield put(global.showLoader());
    yield call(rsf.database.update, `holidays/${id}`, {
      description,
      date,
    });
    yield put(holidays.get());
  } catch (error) {
    console.log(error);
  }
  yield put(global.hideLoader());
}

export default function* watchEditHoliday() {
  yield all([takeLatest(holidays.edit.type, callEditHoliday)]);
}
