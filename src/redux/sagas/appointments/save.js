import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { global } from 'redux/reducers/global';
import { appointments } from 'redux/reducers/appointments';
import moment from 'moment';
import rsf from '../../rsf';

function* callSaveAppointment({ payload }) {
  const {
    title, endDate, startDate, description, professional,
  } = payload;
  try {
    yield put(global.showLoader());
    let parsedStartDate = startDate;
    let parsedEndDate = endDate;
    if (moment.isMoment(startDate)) {
      parsedStartDate = moment(startDate).toDate();
    }
    if (moment.isMoment(endDate)) {
      parsedEndDate = moment(endDate).toDate();
    }
    yield call(rsf.database.create, 'appointments', {
      title,
      startDate: parsedStartDate.toUTCString(),
      endDate: parsedEndDate.toUTCString(),
      description,
      professional,
    });
  } catch {
    // TODO handle error
  }
  yield put(global.hideLoader());
}

export default function* watchSaveAppointment() {
  yield all([takeLatest(appointments.save.type, callSaveAppointment)]);
}
