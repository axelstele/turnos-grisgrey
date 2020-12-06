import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { professionals } from 'redux/reducers/professionals';
import { CANCEL_BUTTON_TEXT, CONFIRM_BUTTON_TEXT, DELETE_PROFFESIONAL_TEXT } from 'constants/professionals';

const DeleteDialog = ({ handleShowDeleteDialog, selectedRows, showDeleteDialog }) => {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(professionals.remove({ selectedRows }));
    handleShowDeleteDialog();
  };

  if (!showDeleteDialog) {
    return null;
  }

  return (
    <Dialog
      open
      onClose={handleShowDeleteDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {DELETE_PROFFESIONAL_TEXT}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleShowDeleteDialog} color="primary">
          {CANCEL_BUTTON_TEXT}
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          {CONFIRM_BUTTON_TEXT}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  handleShowDeleteDialog: PropTypes.func,
  selectedRows: PropTypes.arrayOf(PropTypes.object),
  showDeleteDialog: PropTypes.bool,
};

export default DeleteDialog;
