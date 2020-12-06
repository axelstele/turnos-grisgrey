import { all, fork } from 'redux-saga/effects';
import watchGetAppointments from './appointments/get';
import watchRemoveAppointment from './appointments/remove';
import watchSaveAppointment from './appointments/save';
import watchSyncAppointments from './appointments/sync';
import watchUpdateAppointment from './appointments/update';
import watchLogInUser from './user/login';
import watchLogOutUser from './user/logout';
import watchSyncUser from './user/sync';
import watchGetPractices from './practices/get';
import watchAddPractices from './practices/add';
import watchEditPractice from './practices/edit';
import watchRemovePractices from './practices/remove';
import watchGetProfessionals from './professionals/get';
import watchAddProfessional from './professionals/add';
import watchEditProfessional from './professionals/edit';
import watchRemoveProfessionals from './professionals/remove';
import watchGetCalendar from './calendar/get';

export default function* rootSaga() {
  yield all([
    fork(watchGetAppointments),
    fork(watchRemoveAppointment),
    fork(watchSaveAppointment),
    fork(watchUpdateAppointment),
    fork(watchSyncAppointments),
    fork(watchLogInUser),
    fork(watchLogOutUser),
    fork(watchSyncUser),
    fork(watchGetPractices),
    fork(watchAddPractices),
    fork(watchEditPractice),
    fork(watchRemovePractices),
    fork(watchGetProfessionals),
    fork(watchAddProfessional),
    fork(watchEditProfessional),
    fork(watchRemoveProfessionals),
    fork(watchGetCalendar),
  ]);
}
