import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { practices } from 'redux/reducers/practices';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from '@material-ui/core';
import {
  ADD_PRACTICE_TEXT, CANCEL_BUTTON_TEXT, CONFIRM_BUTTON_TEXT, EDIT_PRACTICE_TEXT,
} from 'constants/practices';

const AddEditDialog = ({
  dialogType, handleCloseDialog, openDialog, selectedRows,
}) => {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [description, setDescription] = useState('');

  const clearDialog = () => {
    setId(null);
    setDescription('');
  };

  const handleClose = () => {
    clearDialog();
    handleCloseDialog();
  };

  const handleConfirm = () => {
    if (dialogType === 'edit') {
      dispatch(practices.edit({
        id, description,
      }));
    } else {
      dispatch(practices.add({ description }));
    }
    handleClose();
  };

  useEffect(() => {
    if (dialogType === 'edit') {
      setId(selectedRows[0].id);
      setDescription(selectedRows[0].description);
    }
  }, [openDialog]);

  if (!openDialog) {
    return null;
  }

  return (
    <Dialog aria-labelledby="form-dialog-title" onClose={handleClose} open scroll="paper">
      <DialogTitle id="form-dialog-title">{dialogType === 'edit' ? EDIT_PRACTICE_TEXT : ADD_PRACTICE_TEXT}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {CANCEL_BUTTON_TEXT}
        </Button>
        <Button disabled={!description} color="primary" onClick={handleConfirm}>
          {CONFIRM_BUTTON_TEXT}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddEditDialog.propTypes = {
  dialogType: PropTypes.string,
  handleCloseDialog: PropTypes.func,
  openDialog: PropTypes.bool,
  selectedRows: PropTypes.arrayOf(PropTypes.object),
};

export default AddEditDialog;
