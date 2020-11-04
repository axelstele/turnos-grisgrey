import { all, fork } from 'redux-saga/effects';
import watchGetAppointments from './appointments/get';
import watchSaveAppointment from './appointments/save';
import watchSyncAppointments from './appointments/sync';
import watchLogInUser from './user/login';
import watchLogOutUser from './user/logout';
import watchSyncUser from './user/sync';
import watchGetProfessionals from './professionals/get';
import watchAddProfessional from './professionals/add';
import watchGetCalendar from './calendar/get';

export default function* rootSaga() {
  yield all([
    fork(watchGetAppointments),
    fork(watchSaveAppointment),
    fork(watchSyncAppointments),
    fork(watchLogInUser),
    fork(watchLogOutUser),
    fork(watchSyncUser),
    fork(watchGetProfessionals),
    fork(watchAddProfessional),
    fork(watchGetCalendar),
  ]);
}
