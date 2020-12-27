import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { global } from 'redux/reducers/global';
import { patients } from 'redux/reducers/patients';
import rsf from '../../rsf';

function* callEditPatients({ payload }) {
  const {
    id, name, surname,
  } = payload;
  try {
    yield put(global.showLoader());
    yield call(rsf.database.update, `patients/${id}`, {
      name,
      surname,
    });
    yield put(patients.get());
  } catch (error) {
    console.log(error);
  }
  yield put(global.hideLoader());
}

export default function* watchEditPatient() {
  yield all([takeLatest(patients.edit.type, callEditPatients)]);
}
