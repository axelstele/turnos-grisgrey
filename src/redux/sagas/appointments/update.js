import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { global } from 'redux/reducers/global';
import { appointments } from 'redux/reducers/appointments';
import moment from 'moment';
import rsf from '../../rsf';

function* callUpdateAppointment({ payload }) {
  const {
    id, endDate, startDate, description, patient, professional, practices,
  } = payload;
  yield put(global.showLoader());
  try {
    let parsedEndDate = endDate;
    if (moment.isMoment(endDate)) {
      parsedEndDate = moment(endDate).toDate().toUTCString();
    }
    yield call(rsf.database.update, `appointments/${id}`, {
      startDate: new Date(startDate).toUTCString(),
      endDate: parsedEndDate,
      description,
      patient,
      professional,
      practices,
    });
  } catch (error) {
    console.log(error);
  }
  yield put(global.hideLoader());
}

export default function* watchUpdateAppointment() {
  yield all([takeLatest(appointments.update.type, callUpdateAppointment)]);
}
