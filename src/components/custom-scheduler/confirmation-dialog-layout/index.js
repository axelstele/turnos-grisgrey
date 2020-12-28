import React from 'react';
import PropTypes from 'prop-types';
import {
  CANCEL_DELETE_TEXT, CONFIRM_DELETE_TEXT, MESSAGE_DELETE_TEXT,
} from 'constants/custom-scheduler';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useStyles from './styles';

const ConfirmationDialogLayout = ({ handleCancel, handleConfirm }) => {
  const classes = useStyles();

  return (
    <Dialog
      aria-describedby="alert-dialog-description"
      classes={{ root: classes.root }}
      onClose={handleCancel}
      open
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {MESSAGE_DELETE_TEXT}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          {CANCEL_DELETE_TEXT}
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          {CONFIRM_DELETE_TEXT}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialogLayout.propTypes = {
  handleCancel: PropTypes.func,
  handleConfirm: PropTypes.func,
};

export default ConfirmationDialogLayout;
