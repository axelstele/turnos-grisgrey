import { all, fork } from 'redux-saga/effects';

import getAppointments from './get-appointments';
import saveAppointment from './save-appointment';

export default function* rootSaga() {
  yield all([
    fork(getAppointments),
    fork(saveAppointment),
  ]);
}
