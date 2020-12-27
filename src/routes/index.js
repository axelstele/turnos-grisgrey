import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Login from 'views/login';
import PrivateRoute from 'views/private';
import NotFound from 'views/not-found';
import Home from 'views/home';
import Patients from 'views/patients';
import Professionals from 'views/professionals';
import Practices from 'views/practices';
import {
  LOGIN_PATHNAME, HOME_PATHNAME, PATIENTS_PATHNAME, PRACTICES_PATHNAME, PROFESSIONALS_PATHNAME,
} from 'constants/routes';

const Routes = () => (
  <Switch>
    <Route exact path={LOGIN_PATHNAME} component={Login} />
    <PrivateRoute exact path={HOME_PATHNAME} component={Home} />
    <PrivateRoute exact path={PROFESSIONALS_PATHNAME} component={Professionals} />
    <PrivateRoute exact path={PRACTICES_PATHNAME} component={Practices} />
    <PrivateRoute exact path={PATIENTS_PATHNAME} component={Patients} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
