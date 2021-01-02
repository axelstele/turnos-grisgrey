/* eslint-disable import/no-named-as-default */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import appointments from './appointments';
import calendar from './calendar';
import global from './global';
import holidays from './holidays';
import patients from './patients';
import professionals from './professionals';
import practices from './practices';
import user from './user';

export default (history) => combineReducers({
  router: connectRouter(history),
  appointments,
  calendar,
  global,
  holidays,
  patients,
  practices,
  professionals,
  user,
});
