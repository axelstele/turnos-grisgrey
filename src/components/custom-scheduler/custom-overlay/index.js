/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import {
  IconButton, TextField, Button, MenuItem, Checkbox, FormControlLabel,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Notes from '@material-ui/icons/Notes';
import moment from 'moment';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { appointments } from 'redux/reducers/appointments';
import Person from '@material-ui/icons/Person';
import Face from '@material-ui/icons/Face';
import { formattedDataSelector as formattedPatientsDataSelector } from 'redux/selectors/patients';
import { formattedDataSelector as formattedPracticesDataSelector } from 'redux/selectors/practices';
import { formattedDataSelector as formattedProfessionalsDataSelector } from 'redux/selectors/professionals';
import {
  CREATE_BUTTON_TEXT,
  DESCRIPTION_TEXT,
  END_DATE_TEXT,
  PATIENTS_TEXT,
  PRACTICES_TEXT,
  PROFESSIONAL_TEXT,
  START_DATE_TEXT,
  UPDATE_BUTTON_TEXT,
  BLOCK_TIME_ONLY,
} from 'constants/home';
import PanToolIcon from '@material-ui/icons/PanTool';
import sortAlphabeticallyByField from 'utils/arrays';
import useStyles from './styles';
import 'moment/locale/es';

const CustomOverlay = ({
  appointmentData: {
    id, blocked, startDate, endDate, patient, practices, professional, description,
  }, handleClose, target, visible,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formBlocked, setFormBlocked] = useState(blocked || false);
  const [selectedPractices, setSelectedPractices] = useState(practices || []);
  const [selectedProfessional, setSelectedProfessional] = useState(professional || '');
  const [formStartDate, setFormStartDate] = useState(startDate);
  const [formEndDate, setFormEndDate] = useState(endDate);
  const [selectedPatient, setSelectedPatient] = useState(patient || '');
  const [formDescription, setFormDescription] = useState(description || '');
  const patientsData = useSelector(formattedPatientsDataSelector, shallowEqual);
  const practicesData = useSelector(formattedPracticesDataSelector, shallowEqual);
  const professionalsData = useSelector(formattedProfessionalsDataSelector, shallowEqual);

  const handleCommitChanges = () => {
    if (id) {
      dispatch(appointments.update({
        id,
        blocked: formBlocked,
        startDate: formStartDate,
        endDate: formEndDate,
        description: formDescription,
        patient: selectedPatient,
        professional: selectedProfessional,
        practices: selectedPractices,
      }));
    } else {
      dispatch(appointments.save({
        blocked: formBlocked,
        startDate: formStartDate,
        endDate: formEndDate,
        description: formDescription,
        patient: selectedPatient,
        professional: selectedProfessional,
        practices: selectedPractices,
      }));
    }
    handleClose();
  };

  const handleBlockedChange = ({ target: { checked } }) => {
    setFormBlocked(checked);
    if (checked) {
      setSelectedPatient('');
      setSelectedPractices([]);
    } else if (patientsData?.length) {
      setSelectedPatient(patientsData[0].id);
    }
  };

  const handleDescriptionChange = ({ target: { value } }) => {
    setFormDescription(value);
  };

  const handlePracticesChange = ({ target: { value } }) => {
    setSelectedPractices(value);
  };

  const handleProfessionalChange = ({ target: { value } }) => {
    setSelectedProfessional(value);
  };

  const handlePatientChange = ({ target: { value } }) => {
    setSelectedPatient(value);
  };

  const pickerEditorProps = (field) => ({
    ampm: true,
    className: classes.picker,
    format: 'DD/MM/YYYY HH:mm',
    label: field[0].toUpperCase() + field.slice(1),
    variant: 'inline',
  });

  const textEditorProps = (field) => ({
    variant: 'outlined',
    label: field[0].toUpperCase() + field.slice(1),
    className: classes.textField,
  });

  useEffect(() => {
    if (!formBlocked && !selectedPatient && patientsData?.length) {
      setSelectedPatient(patientsData[0].id);
    }
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
          <FormControlLabel
            control={(
              <Checkbox
                checked={formBlocked}
                color="primary"
                onChange={handleBlockedChange}
              />
        )}
            label={BLOCK_TIME_ONLY}
          />
        </div>
        <div className={classes.wrapper}>
          <Face className={classes.icon} color="action" />
          <TextField
            disabled={formBlocked}
            select
            value={selectedPatient}
            onChange={handlePatientChange}
            {...textEditorProps(PATIENTS_TEXT)}
          >
            {sortAlphabeticallyByField(patientsData, 'name')?.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
                {' '}
                {item.surname}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className={classes.wrapper}>
          <Person className={classes.icon} color="action" />
          <TextField
            select
            value={selectedProfessional}
            onChange={handleProfessionalChange}
            {...textEditorProps(PROFESSIONAL_TEXT)}
          >
            {sortAlphabeticallyByField(professionalsData, 'name')?.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className={classes.wrapper}>
          <CalendarToday className={classes.icon} color="action" />
          <MuiPickersUtilsProvider locale="es" utils={MomentUtils}>
            <DateTimePicker
              onChange={setFormStartDate}
              value={moment(formStartDate)}
              {...pickerEditorProps(START_DATE_TEXT)}
            />
            <DateTimePicker
              minDate={moment(formStartDate)}
              minDateMessage="Día/hora de finalización no puede ser anterior a día/hora de inicio"
              maxDate={moment(formStartDate).endOf('day')}
              strictCompareDates
              onChange={setFormEndDate}
              value={moment(formEndDate)}
              {...pickerEditorProps(END_DATE_TEXT)}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.wrapper}>
          <PanToolIcon className={classes.icon} color="action" />
          <TextField
            disabled={formBlocked}
            select
            SelectProps={{
              multiple: true,
              value: selectedPractices,
              onChange: handlePracticesChange,
            }}
            {...textEditorProps(PRACTICES_TEXT)}
          >
            {sortAlphabeticallyByField(practicesData, 'description')?.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.description}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className={classes.wrapper}>
          <Notes className={classes.icon} color="action" />
          <TextField
            {...textEditorProps(DESCRIPTION_TEXT)}
            multiline
            onChange={handleDescriptionChange}
            rows="6"
            value={formDescription}
          />
        </div>
      </div>
      <div className={classes.buttonGroup}>
        <Button
          className={classes.button}
          color="primary"
          disabled={(!formBlocked && (!formStartDate || !formEndDate || !selectedPatient))
            || moment(formEndDate).isBefore(moment(formStartDate))}
          onClick={handleCommitChanges}
          variant="contained"
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
    blocked: PropTypes.bool,
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
    patient: PropTypes.string,
    practices: PropTypes.arrayOf(PropTypes.string),
    professional: PropTypes.string,
    title: PropTypes.string,
  }),
  handleCommitChanges: PropTypes.func,
  handleClose: PropTypes.func,
  target: PropTypes.objectOf(PropTypes.object),
  visible: PropTypes.bool,
};

export default CustomOverlay;
