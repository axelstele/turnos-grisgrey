import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { global } from 'redux/reducers/global';
import { practices } from 'redux/reducers/practices';
import rsf from '../../rsf';

function* callRemovePractices({ payload }) {
  const { selectedRows } = payload;

  try {
    yield put(global.showLoader());
    yield all(selectedRows.map((practice) => call(rsf.database.delete, `practices/${practice.id}`)));
    yield put(practices.get());
  } catch {
    // TODO handle error
  }
  yield put(global.hideLoader());
}

export default function* watchRemovePractices() {
  yield all([takeLatest(practices.remove.type, callRemovePractices)]);
}
