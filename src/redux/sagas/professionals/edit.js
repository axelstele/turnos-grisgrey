import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { global } from 'redux/reducers/global';
import { professionals } from 'redux/reducers/professionals';
import rsf from '../../rsf';

function* callEditProfessional({ payload }) {
  const {
    id, name, surname, color,
  } = payload;

  try {
    yield put(global.showLoader());
    yield call(rsf.database.update, `professionals/${id}`, {
      name,
      surname,
      color,
    });
    yield put(professionals.get());
  } catch (error) {
    console.log(error);
  }
  yield put(global.hideLoader());
}

export default function* watchEditProfessional() {
  yield all([takeLatest(professionals.edit.type, callEditProfessional)]);
}
