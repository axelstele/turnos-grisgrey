import { all, fork } from 'redux-saga/effects';
import appointmentsSagas from './appointments';
import userSagas from './user';
import patientsSagas from './patients';
import practicesSagas from './practices';
import professionalsSagas from './professionals';
import watchGetCalendar from './calendar/get';

export default function* rootSaga() {
  yield all([
    fork(appointmentsSagas),
    fork(userSagas),
    fork(patientsSagas),
    fork(practicesSagas),
    fork(professionalsSagas),
    fork(watchGetCalendar),
  ]);
}
