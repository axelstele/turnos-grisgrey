import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { professionals } from 'redux/reducers/professionals';
import { CirclePicker } from 'react-color';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from '@material-ui/core';
import { ADD_PROFESSIONAL_TEXT, EDIT_PROFESSIONAL_TEXT } from 'constants/professionals';
import { CANCEL_BUTTON_TEXT, CONFIRM_BUTTON_TEXT } from 'constants/global';
import useStyles from './styles';

const AddEditDialog = ({
  dialogType, handleCloseDialog, openDialog, selectedRows,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [color, setColor] = useState('#f44336');

  const clearDialog = () => {
    setId(null);
    setName('');
    setSurname('');
    setColor('#f44336');
  };

  const handleClose = () => {
    clearDialog();
    handleCloseDialog();
  };

  const handleConfirm = () => {
    if (dialogType === 'edit') {
      dispatch(professionals.edit({
        id, name, surname, color,
      }));
    } else {
      dispatch(professionals.add({ name, surname, color }));
    }
    handleClose();
  };

  const handleChange = (selectedColor) => {
    setColor(selectedColor.hex);
  };

  useEffect(() => {
    if (dialogType === 'edit') {
      setId(selectedRows[0].id);
      setName(selectedRows[0].name);
      setSurname(selectedRows[0].surname);
      setColor(selectedRows[0].color);
    }
  }, [openDialog]);

  if (!openDialog) {
    return null;
  }

  return (
    <Dialog aria-labelledby="form-dialog-title" onClose={handleClose} open scroll="paper">
      <DialogTitle id="form-dialog-title">{dialogType === 'edit' ? EDIT_PROFESSIONAL_TEXT : ADD_PROFESSIONAL_TEXT}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <TextField
          margin="dense"
          id="surname"
          label="Surname"
          type="name"
          fullWidth
          value={surname}
          onChange={({ target }) => setSurname(target.value)}
        />
        <div className={classes.colorPicker}>
          <CirclePicker color={color} onChange={handleChange} />
        </div>
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
