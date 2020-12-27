import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { global } from 'redux/reducers/global';
import { patients } from 'redux/reducers/patients';
import rsf from '../../rsf';

function* callRemovePatients({ payload }) {
  const { selectedRows } = payload;

  try {
    yield put(global.showLoader());
    yield all(selectedRows.map((patient) => call(rsf.database.delete, `patients/${patient.id}`)));
    yield put(patients.get());
  } catch {
    // TODO handle error
  }
  yield put(global.hideLoader());
}

export default function* watchRemovePatients() {
  yield all([takeLatest(patients.remove.type, callRemovePatients)]);
}
