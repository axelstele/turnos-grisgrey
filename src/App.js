import React from 'react';
import './App.css';
import CustomScheduler from './components/custom-scheduler';
import CustomLoader from './components/custom-loader';

function App() {
  return (
    <>
      <CustomLoader />
      <CustomScheduler />
    </>
  );
}

export default App;
