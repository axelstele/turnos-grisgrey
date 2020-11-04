import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Login from 'views/login';
import Home from 'views/home';
import Professionals from 'views/professionals';
import PrivateRoute from 'views/private';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <PrivateRoute path="/home" component={Home} />
    <PrivateRoute path="/professionals" component={Professionals} />
  </Switch>
);

export default Routes;
