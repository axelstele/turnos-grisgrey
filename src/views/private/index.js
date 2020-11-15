/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route } from 'react-router-dom';
import CustomAppBar from 'components/custom-app-bar';
import CustomDrawer from 'components/custom-drawer';
import { useSelector, shallowEqual } from 'react-redux';
import { dataSelector } from 'redux/selectors/user';

const PrivateRoute = ({
  component: Comp, path, ...rest
}) => {
  const userData = useSelector(dataSelector, shallowEqual);

  if (!userData) {
    return null;
  }

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => (
        <>
          <CustomAppBar />
          <CustomDrawer />
          <div style={{ marginTop: 64 }}>
            <Comp {...props} />
          </div>
        </>
      )}
    />
  );
};

export default PrivateRoute;
