import {
  all, takeLatest, put, call,
} from 'redux-saga/effects';
import { holidays } from 'redux/reducers/holidays';
import get from 'apis/holidays';
import moment from 'moment';

export function* callGetHolidays() {
  try {
    const response = yield all([
      call(get, moment().subtract(1, 'years').year()),
      call(get, moment().year()),
      call(get, moment().add(1, 'years').year()),
    ]);
    const formattedHolidays = {
      [moment().subtract(1, 'years').year()]: response[0].data,
      [moment().year()]: response[1].data,
      [moment().add(1, 'years').year()]: response[2].data,
    };
    yield put(holidays.getSuccess(formattedHolidays));
  } catch (error) {
    console.log(error);
  }
}

export default function* watchGetHolidays() {
  yield all([takeLatest(holidays.get.type, callGetHolidays)]);
}
