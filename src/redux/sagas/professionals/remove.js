import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { global } from 'redux/reducers/global';
import { professionals } from 'redux/reducers/professionals';
import rsf from '../../rsf';

function* callRemoveProfessionals({ payload }) {
  const { selectedRows } = payload;

  try {
    yield put(global.showLoader());
    yield all(selectedRows.map((professional) => call(rsf.database.delete, `professionals/${professional.id}`)));
    yield put(professionals.get());
  } catch {
    // TODO handle error
  }
  yield put(global.hideLoader());
}

export default function* watchRemoveProfessionals() {
  yield all([takeLatest(professionals.remove.type, callRemoveProfessionals)]);
}
