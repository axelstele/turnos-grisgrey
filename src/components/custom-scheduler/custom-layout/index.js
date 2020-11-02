/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Create from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Notes from '@material-ui/icons/Notes';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { appointments } from '../../../redux/reducers/appointments';
import useStyles from './styles';

const CustomOverlay = ({
  appointmentData: { startDate, endDate, title }, setFormAppointmentVisible, target, visible,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formStartDate, setFormStartDate] = useState(startDate);
  const [formEndDate, setFormEndDate] = useState(endDate);
  const [formTitle, setFormTitle] = useState(title);

  const handleClose = () => {
    setFormAppointmentVisible(!visible);
  };

  const handleCommitChanges = () => {
    dispatch(appointments.save({
      title: formTitle, startDate: formStartDate, endDate: formEndDate,
    }));
  };

  const pickerEditorProps = () => ({
    ampm: false,
    className: classes.picker,
    format: 'DD/MM/YYYY HH:mm',
    inputVariant: 'outlined',
  });

  const textEditorProps = (field) => ({
    variant: 'outlined',
    label: field[0].toUpperCase() + field.slice(1),
    className: classes.textField,
  });

  return (
    <AppointmentForm.Overlay
      visible={visible}
      target={target}
    >
      <div>
        <div className={classes.header}>
          <IconButton
            className={classes.closeButton}
            onClick={handleClose}
          >
            <Close color="action" />
          </IconButton>
        </div>
        <div className={classes.content}>
          <div className={classes.wrapper}>
            <Create className={classes.icon} color="action" />
            <TextField value={formTitle} onChange={({ target: { value } }) => setFormTitle(value)} {...textEditorProps('title')} />
          </div>
          <div className={classes.wrapper}>
            <CalendarToday className={classes.icon} color="action" />
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDateTimePicker
                inputValue={moment(formStartDate).format('DD/MM/YYYY HH:mm')}
                label="Start Date"
                onChange={(date) => setFormStartDate(date)}
                {...pickerEditorProps()}
              />
              <KeyboardDateTimePicker
                inputValue={moment(formEndDate).format('DD/MM/YYYY HH:mm')}
                label="End Date"
                onChange={(date) => setFormEndDate(date)}
                {...pickerEditorProps()}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.wrapper}>
            <Notes className={classes.icon} color="action" />
            <TextField
              {...textEditorProps('description')}
              multiline
              rows="6"
            />
          </div>
        </div>
        <div className={classes.buttonGroup}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={handleCommitChanges}
          >
            Create
          </Button>
        </div>
      </div>
    </AppointmentForm.Overlay>
  );
};

CustomOverlay.propTypes = {
  appointmentData: PropTypes.objectOf(),
  handleCommitChanges: PropTypes.func,
  setFormAppointmentVisible: PropTypes.func,
  target: PropTypes.objectOf(),
  visible: PropTypes.bool,
};

export default CustomOverlay;
