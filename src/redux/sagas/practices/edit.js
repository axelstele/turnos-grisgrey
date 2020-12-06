import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { global } from 'redux/reducers/global';
import { practices } from 'redux/reducers/practices';
import rsf from '../../rsf';

function* callEditPractice({ payload }) {
  const {
    id, description,
  } = payload;

  try {
    yield put(global.showLoader());
    yield call(rsf.database.update, `practices/${id}`, {
      description,
    });
    yield put(practices.get());
  } catch (error) {
    console.log(error);
  }
  yield put(global.hideLoader());
}

export default function* watchEditPractice() {
  yield all([takeLatest(practices.edit.type, callEditPractice)]);
}
