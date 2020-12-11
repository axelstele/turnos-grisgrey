import React, { useEffect } from 'react';
import CustomLoader from 'components/custom-loader';
import Routes from 'routes';
import { user } from 'redux/reducers/user';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(user.sync());
  }, []);

  return (
    <>
      <CustomLoader />
      <Routes />
    </>
  );
};
export default App;
