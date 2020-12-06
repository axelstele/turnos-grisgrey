/* eslint-disable import/no-named-as-default */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import appointments from './appointments';
import global from './global';
import user from './user';
import professionals from './professionals';
import practices from './practices';
import calendar from './calendar';

export default (history) => combineReducers({
  router: connectRouter(history),
  appointments,
  calendar,
  global,
  practices,
  professionals,
  user,
});
