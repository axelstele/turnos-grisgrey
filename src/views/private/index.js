/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Redirect,
  Route,
} from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { dataSelector } from 'redux/selectors/user';
import CustomNavbar from 'components/custom-navbar';
import CustomDrawer from 'components/custom-drawer';

const PrivateRoute = ({
  component: Comp, path, ...rest
}) => {
  const userData = useSelector(dataSelector, shallowEqual);

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => (userData ? (
        <>
          <CustomNavbar />
          <CustomDrawer />
          <Comp {...props} />
        </>
      ) : (
        <Redirect to={{ pathname: '/' }} />
      ))}
    />
  );
};

export default PrivateRoute;
