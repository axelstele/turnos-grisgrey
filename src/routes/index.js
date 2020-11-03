import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Login from 'routes/login';
import Home from 'routes/home';
import PrivateRoute from 'routes/private';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <PrivateRoute path="/home" component={Home} />
  </Switch>
);

export default Routes;
