import React, { useEffect } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import './App.css';
import CustomLoader from 'components/custom-loader';
import { user } from 'redux/reducers/user';
import Routes from 'routes';
import { dataSelector } from 'redux/selectors/user';

const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector(dataSelector, shallowEqual);

  useEffect(() => {
    dispatch(user.sync());
  }, [userData]);

  return (
    <>
      <CustomLoader />
      <Routes />
    </>
  );
};

export default App;
