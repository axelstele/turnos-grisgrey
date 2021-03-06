import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { useSelector, shallowEqual } from 'react-redux';
import { formattedDataSelector as formattedPatientsDataSelector } from 'redux/selectors/patients';
import { formattedDataSelector as formattedProfessionalsDataSelector } from 'redux/selectors/professionals';
import moment from 'moment';
import useStyles from './styles';

const Appointment = ({ data, ...restProps }) => {
  const { patient, professional } = data;
  const patients = useSelector(formattedPatientsDataSelector, shallowEqual);
  const professionals = useSelector(formattedProfessionalsDataSelector, shallowEqual);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const foundProfessional = professionals?.find((item) => item.id === professional);
    setSelectedProfessional(foundProfessional);
    const foundPatient = patients?.find((item) => item.id === patient);
    setSelectedPatient(foundPatient);
  }, [professionals, patient]);

  const classes = useStyles({ color: selectedProfessional?.color });

  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Appointments.Appointment {...restProps} className={classes.appointment} data={data}>
        <div className={classes.container}>
          <div className={classes.title}>
            {selectedPatient?.name}
            {' '}
            {selectedPatient?.surname}
          </div>
          <span>
            {data?.startDate && moment(data.startDate).format('hh:mm')}
            {' - '}
            {data?.endDate && moment(data.endDate).format('hh:mm')}
          </span>
        </div>
      </Appointments.Appointment>
    </>
  );
};

Appointment.propTypes = {
  data: PropTypes.shape({
    endDate: PropTypes.string,
    patient: PropTypes.string,
    professional: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
  }),
};

export default Appointment;
