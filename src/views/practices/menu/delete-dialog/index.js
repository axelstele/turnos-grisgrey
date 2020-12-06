import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { practices } from 'redux/reducers/practices';
import { CANCEL_BUTTON_TEXT, CONFIRM_BUTTON_TEXT, DELETE_PRACTICE_TEXT } from 'constants/practices';

const DeleteDialog = ({ handleShowDeleteDialog, selectedRows, showDeleteDialog }) => {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(practices.remove({ selectedRows }));
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
          {DELETE_PRACTICE_TEXT}
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
