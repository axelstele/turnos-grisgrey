/* eslint-disable import/no-named-as-default */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import appointments from './appointments';
import global from './global';
import user from './user';
import professionals from './professionals';
import calendar from './calendar';

export default (history) => combineReducers({
  router: connectRouter(history),
  appointments,
  global,
  user,
  professionals,
  calendar,
});
