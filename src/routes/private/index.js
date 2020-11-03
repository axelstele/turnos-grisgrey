/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Redirect,
  Route,
} from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { dataSelector } from 'redux/selectors/user';

const PrivateRoute = ({
  component: Comp, path, ...rest
}) => {
  const userData = useSelector(dataSelector, shallowEqual);

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => (userData ? (
        <Comp {...props} />
      ) : (
        <Redirect to={{ pathname: '/' }} />
      ))}
    />
  );
};

export default PrivateRoute;
