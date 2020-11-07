import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_PATHNAME } from 'constants/routes';
import { useSelector, shallowEqual } from 'react-redux';
import { dataSelector } from 'redux/selectors/user';

const NotFound = () => {
  const userData = useSelector(dataSelector, shallowEqual);

  if (!userData) {
    return null;
  }

  return (
    <>
      <h1>404 - Not Found!</h1>
      <Link to={HOME_PATHNAME}>
        Go Home
      </Link>
    </>
  );
};

export default NotFound;
