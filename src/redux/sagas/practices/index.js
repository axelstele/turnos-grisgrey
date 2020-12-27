import { all, fork } from 'redux-saga/effects';
import watchAdd from './add';
import watchEdit from './edit';
import watchGet from './get';
import watchRemove from './remove';

export default function* practicesSagas() {
  yield all([
    fork(watchAdd),
    fork(watchEdit),
    fork(watchGet),
    fork(watchRemove),
  ]);
}
