/* eslint-disable import/no-named-as-default */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import appointments from './appointments';
import calendar from './calendar';
import global from './global';
import user from './user';
import patients from './patients';
import professionals from './professionals';
import practices from './practices';

export default (history) => combineReducers({
  router: connectRouter(history),
  appointments,
  calendar,
  global,
  patients,
  practices,
  professionals,
  user,
});
