import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Login from 'views/login';
import PrivateRoute from 'views/private';
import NotFound from 'views/not-found';
import Home from 'views/home';
import Professionals from 'views/professionals';
import { LOGIN_PATHNAME, HOME_PATHNAME, PROFESSIONALS_PATHNAME } from 'constants/routes';

const Routes = () => (
  <Switch>
    <Route exact path={LOGIN_PATHNAME} component={Login} />
    <PrivateRoute exact path={HOME_PATHNAME} component={Home} />
    <PrivateRoute exact path={PROFESSIONALS_PATHNAME} component={Professionals} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
