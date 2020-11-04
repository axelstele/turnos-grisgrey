import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { global } from 'redux/reducers/global';
import { professionals } from 'redux/reducers/professionals';
import rsf from '../../rsf';

function* callAddProfessional({ payload }) {
  const { name, surname } = payload;
  try {
    yield put(global.showLoader());
    yield call(rsf.database.create, 'professionals', {
      name,
      surname,
    });
  } catch {
    // TODO handle error
  }
  yield put(global.hideLoader());
}

export default function* watchAddProfessional() {
  yield all([takeLatest(professionals.add.type, callAddProfessional)]);
}
