import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { holidays } from 'redux/reducers/holidays';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from '@material-ui/core';
import {
  ADD_HOLIDAY_TEXT, DATE_TEXT, DESCRIPTION_TEXT, EDIT_HOLIDAY_TEXT,
} from 'constants/holidays';
import { CANCEL_BUTTON_TEXT, CONFIRM_BUTTON_TEXT } from 'constants/global';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/es';

const AddEditDialog = ({
  dialogType, handleCloseDialog, openDialog, selectedRows,
}) => {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(moment());

  const clearDialog = () => {
    setId(null);
    setDescription('');
    setDate(moment());
  };

  const handleClose = () => {
    clearDialog();
    handleCloseDialog();
  };

  const handleConfirm = () => {
    const formattedDate = date.format('DD/MM/YYYY');
    if (dialogType === 'edit') {
      dispatch(holidays.edit({
        id, description, date: formattedDate,
      }));
    } else {
      dispatch(holidays.add({ description, date: formattedDate }));
    }
    handleClose();
  };

  useEffect(() => {
    if (dialogType === 'edit') {
      setId(selectedRows[0].id);
      setDescription(selectedRows[0].description);
      setDate(moment(selectedRows[0].date, 'DD/MM/YYYY'));
    }
  }, [openDialog]);

  if (!openDialog) {
    return null;
  }

  return (
    <Dialog aria-labelledby="form-dialog-title" onClose={handleClose} open scroll="paper">
      <DialogTitle id="form-dialog-title">{dialogType === 'edit' ? EDIT_HOLIDAY_TEXT : ADD_HOLIDAY_TEXT}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label={DESCRIPTION_TEXT}
          type="text"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <MuiPickersUtilsProvider locale="es" utils={MomentUtils}>
          <DatePicker
            value={date}
            onChange={setDate}
            format="DD/MM/YYYY"
            label={DATE_TEXT}
            variant="inline"
          />
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {CANCEL_BUTTON_TEXT}
        </Button>
        <Button disabled={!description || !date} color="primary" onClick={handleConfirm}>
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
