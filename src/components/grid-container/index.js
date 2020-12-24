import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';

const GridContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {children}
    </div>
  );
};

GridContainer.propTypes = {
  children: PropTypes.node,
};

export default GridContainer;
