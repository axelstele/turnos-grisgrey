import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { useSelector, shallowEqual } from 'react-redux';
import { formattedDataSelector } from 'redux/selectors/professionals';
import useStyles from './styles';

const Appointment = ({ data, ...restProps }) => {
  const { professional } = data;
  const professionals = useSelector(formattedDataSelector, shallowEqual);
  const [professionalSelected, setProfessionalSelected] = useState(null);

  useEffect(() => {
    const foundProfessional = professionals?.find((item) => item.id === professional);
    setProfessionalSelected(foundProfessional);
  }, [professionals]);

  const classes = useStyles({ color: professionalSelected?.color });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Appointments.Appointment {...restProps} className={classes.appointment} data={data} />
  );
};

Appointment.propTypes = {
  data: PropTypes.shape({
    professional: PropTypes.string,
  }),
};

export default Appointment;
