/* eslint-disable import/no-named-as-default */
import { combineReducers } from 'redux';
import appointments from './appointments';
import global from './global';

export default combineReducers({
  appointments,
  global,
});
