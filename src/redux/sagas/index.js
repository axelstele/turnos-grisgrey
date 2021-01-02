import { all, fork } from 'redux-saga/effects';
import appointmentsSagas from './appointments';
import holidaysSagas from './holidays';
import patientsSagas from './patients';
import practicesSagas from './practices';
import professionalsSagas from './professionals';
import userSagas from './user';
import watchGetCalendar from './calendar/get';

export default function* rootSaga() {
  yield all([
    fork(appointmentsSagas),
    fork(holidaysSagas),
    fork(patientsSagas),
    fork(practicesSagas),
    fork(professionalsSagas),
    fork(userSagas),
    fork(watchGetCalendar),
  ]);
}
