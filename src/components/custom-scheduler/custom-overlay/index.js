/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import {
  IconButton, TextField, Button, MenuItem,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import Create from '@material-ui/icons/Create';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Notes from '@material-ui/icons/Notes';
import moment from 'moment';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { appointments } from 'redux/reducers/appointments';
import Person from '@material-ui/icons/Person';
import { formattedDataSelector } from 'redux/selectors/professionals';
import {
  CREATE_BUTTON_TEXT,
  DESCRIPTION_TEXT,
  END_DATE_TEXT,
  PROFESSIONAL_TEXT,
  START_DATE_TEXT,
  TITLE_TEXT,
  UPDATE_BUTTON_TEXT,
} from 'constants/home';
import useStyles from './styles';

const CustomOverlay = ({
  appointmentData: {
    id, startDate, endDate, title, professional, description,
  }, handleClose, target, visible,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedProfessional, setSelectedProfessional] = useState(professional || '');
  const [formStartDate, setFormStartDate] = useState(startDate);
  const [formEndDate, setFormEndDate] = useState(endDate);
  const [formTitle, setFormTitle] = useState(title || '');
  const [formDescription, setFormDescription] = useState(description || '');
  const professionalsData = useSelector(formattedDataSelector, shallowEqual);

  const handleCommitChanges = () => {
    if (id) {
      dispatch(appointments.update({
        id,
        title: formTitle,
        startDate: formStartDate,
        endDate: formEndDate,
        description: formDescription,
        professional: selectedProfessional,
      }));
    } else {
      dispatch(appointments.save({
        title: formTitle,
        startDate: formStartDate,
        endDate: formEndDate,
        description: formDescription,
        professional: selectedProfessional,
      }));
    }
    handleClose();
  };

  const pickerEditorProps = (field) => ({
    ampm: false,
    className: classes.picker,
    format: 'DD/MM/YYYY HH:mm',
    inputVariant: 'outlined',
    label: field[0].toUpperCase() + field.slice(1),
  });

  const textEditorProps = (field) => ({
    variant: 'outlined',
    label: field[0].toUpperCase() + field.slice(1),
    className: classes.textField,
  });

  useEffect(() => {
    if (!selectedProfessional && professionalsData?.length) {
      setSelectedProfessional(professionalsData[0].id);
    }
  });

  if (!visible) {
    return null;
  }

  return (
    <AppointmentForm.Overlay
      visible
      target={target}
      fullSize={false}
    >
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
          <TextField
            value={formTitle}
            onChange={({ target: { value } }) => setFormTitle(value)}
            {...textEditorProps(TITLE_TEXT)}
          />
        </div>
        <div className={classes.wrapper}>
          <Person className={classes.icon} color="action" />
          <TextField
            select
            value={selectedProfessional}
            onChange={({ target: { value } }) => setSelectedProfessional(value)}
            {...textEditorProps(PROFESSIONAL_TEXT)}
          >
            {professionalsData?.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className={classes.wrapper}>
          <CalendarToday className={classes.icon} color="action" />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDateTimePicker
              inputValue={moment(formStartDate).format('DD/MM/YYYY HH:mm')}
              onChange={setFormStartDate}
              {...pickerEditorProps(START_DATE_TEXT)}
            />
            <KeyboardDateTimePicker
              inputValue={moment(formEndDate).format('DD/MM/YYYY HH:mm')}
              onChange={setFormEndDate}
              {...pickerEditorProps(END_DATE_TEXT)}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.wrapper}>
          <Notes className={classes.icon} color="action" />
          <TextField
            {...textEditorProps(DESCRIPTION_TEXT)}
            multiline
            onChange={({ target: { value } }) => setFormDescription(value)}
            rows="6"
            value={formDescription}
          />
        </div>
      </div>
      <div className={classes.buttonGroup}>
        <Button
          className={classes.button}
          color="primary"
          disabled={!formStartDate || !formEndDate || !formTitle}
          onClick={handleCommitChanges}
          variant="outlined"
        >
          {id ? UPDATE_BUTTON_TEXT : CREATE_BUTTON_TEXT}
        </Button>
      </div>
    </AppointmentForm.Overlay>
  );
};

CustomOverlay.propTypes = {
  appointmentData: PropTypes.shape({
    id: PropTypes.string,
    startDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.number,
      PropTypes.string,
    ]),
    endDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
    description: PropTypes.string,
    title: PropTypes.string,
    professional: PropTypes.string,
  }),
  handleCommitChanges: PropTypes.func,
  handleClose: PropTypes.func,
  target: PropTypes.objectOf(PropTypes.object),
  visible: PropTypes.bool,
};

export default CustomOverlay;
