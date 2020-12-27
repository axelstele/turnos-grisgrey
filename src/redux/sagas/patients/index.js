import { all, fork } from 'redux-saga/effects';
import watchGetPatients from './get';
import watchAddPatient from './add';
import watchEditPatient from './edit';
import watchRemovePatient from './remove';

export default function* patientsSagas() {
  yield all([
    fork(watchGetPatients),
    fork(watchAddPatient),
    fork(watchEditPatient),
    fork(watchRemovePatient),
  ]);
}
