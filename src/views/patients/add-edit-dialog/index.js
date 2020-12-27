import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { patients } from 'redux/reducers/patients';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from '@material-ui/core';
import {
  ADD_PATIENT_TEXT, EDIT_PATIENT_TEXT, NAME_TEXT, SURNAME_TEXT,
} from 'constants/patients';
import { CANCEL_BUTTON_TEXT, CONFIRM_BUTTON_TEXT } from 'constants/global';

const AddEditDialog = ({
  dialogType, handleCloseDialog, openDialog, selectedRows,
}) => {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const clearDialog = () => {
    setId(null);
    setName('');
    setSurname('');
  };

  const handleClose = () => {
    clearDialog();
    handleCloseDialog();
  };

  const handleConfirm = () => {
    if (dialogType === 'edit') {
      dispatch(patients.edit({
        id, name, surname,
      }));
    } else {
      dispatch(patients.add({ name, surname }));
    }
    handleClose();
  };

  useEffect(() => {
    if (dialogType === 'edit') {
      setId(selectedRows[0].id);
      setName(selectedRows[0].name);
      setSurname(selectedRows[0].surname);
    }
  }, [openDialog]);

  if (!openDialog) {
    return null;
  }

  return (
    <Dialog aria-labelledby="form-dialog-title" onClose={handleClose} open scroll="paper">
      <DialogTitle id="form-dialog-title">{dialogType === 'edit' ? EDIT_PATIENT_TEXT : ADD_PATIENT_TEXT}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={NAME_TEXT}
          type="text"
          fullWidth
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <TextField
          margin="dense"
          id="surname"
          label={SURNAME_TEXT}
          type="text"
          fullWidth
          value={surname}
          onChange={({ target }) => setSurname(target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {CANCEL_BUTTON_TEXT}
        </Button>
        <Button disabled={!name || !surname} color="primary" onClick={handleConfirm}>
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
