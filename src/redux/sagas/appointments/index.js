import { all, fork } from 'redux-saga/effects';
import watchGetAppointments from './get';
import watchRemoveAppointment from './remove';
import watchSaveAppointment from './save';
import watchSyncAppointments from './sync';
import watchUpdateAppointment from './update';

export default function* appointmentsSagas() {
  yield all([
    fork(watchGetAppointments),
    fork(watchRemoveAppointment),
    fork(watchSaveAppointment),
    fork(watchSyncAppointments),
    fork(watchUpdateAppointment),
  ]);
}
