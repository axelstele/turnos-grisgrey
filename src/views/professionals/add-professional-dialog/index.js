import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { professionals } from 'redux/reducers/professionals';

const AddProfessionalDialog = ({ handleCloseDialog, openDialog }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleAdd = () => {
    dispatch(professionals.add({ name, surname }));
    handleCloseDialog();
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add professional</DialogTitle>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddProfessionalDialog.propTypes = {
  handleCloseDialog: PropTypes.func,
  openDialog: PropTypes.bool,
};

export default AddProfessionalDialog;
