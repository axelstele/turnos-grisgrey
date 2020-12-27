import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { global } from 'redux/reducers/global';
import { patients } from 'redux/reducers/patients';
import rsf from '../../rsf';

function* callAddPatient({ payload }) {
  const { name, surname } = payload;
  try {
    yield put(global.showLoader());
    yield call(rsf.database.create, 'patients', {
      name,
      surname,
    });
    yield put(patients.get());
  } catch {
    // TODO handle error
  }
  yield put(global.hideLoader());
}

export default function* watchAddPatient() {
  yield all([takeLatest(patients.add.type, callAddPatient)]);
}
