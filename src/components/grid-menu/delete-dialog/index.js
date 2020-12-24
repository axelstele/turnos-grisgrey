import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText,
} from '@material-ui/core';
import { CANCEL_BUTTON_TEXT, CONFIRM_BUTTON_TEXT } from 'constants/global';

const DeleteDialog = ({
  dialogText, handleConfirmRemove, handleShowDeleteDialog, showDeleteDialog,
}) => {
  const handleConfirm = () => {
    handleConfirmRemove();
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
          {dialogText}
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
  dialogText: PropTypes.string,
  handleConfirmRemove: PropTypes.func,
  handleShowDeleteDialog: PropTypes.func,
  showDeleteDialog: PropTypes.bool,
};

export default DeleteDialog;
