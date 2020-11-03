import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';
import useStyles from './styles';

export default function SimpleBackdrop() {
  const classes = useStyles();
  const isLoading = useSelector((state) => state.global?.isLoading);

  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
