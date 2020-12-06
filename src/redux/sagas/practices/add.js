import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { global } from 'redux/reducers/global';
import { practices } from 'redux/reducers/practices';
import rsf from '../../rsf';

function* callAddPractice({ payload }) {
  const { description } = payload;
  try {
    yield put(global.showLoader());
    yield call(rsf.database.create, 'practices', {
      description,
    });
    yield put(practices.get());
  } catch {
    // TODO handle error
  }
  yield put(global.hideLoader());
}

export default function* watchAddPractice() {
  yield all([takeLatest(practices.add.type, callAddPractice)]);
}
