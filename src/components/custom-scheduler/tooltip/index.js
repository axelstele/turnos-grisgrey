import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Lens from '@material-ui/icons/Lens';
import AccessTime from '@material-ui/icons/AccessTime';
import { Chip, Grid } from '@material-ui/core';
import { useSelector, shallowEqual } from 'react-redux';
import { formattedDataSelector as formattedPatientsDataSelector } from 'redux/selectors/patients';
import { formattedDataSelector as formattedPracticesDataSelector } from 'redux/selectors/practices';
import { formattedDataSelector as formattedProfessionalsDataSelector } from 'redux/selectors/professionals';
import classNames from 'clsx';
import Person from '@material-ui/icons/Person';
import getPracticesFullData from 'utils/practices';
import PanToolIcon from '@material-ui/icons/PanTool';
import { NOT_AVAILABLE } from 'constants/home';
import useStyles from './styles';

const Tooltip = ({
  appointmentData: {
    endDate, startDate, patient, professional, practices, blocked,
  }, formatDate,
}) => {
  const allPractices = useSelector(formattedPracticesDataSelector, shallowEqual);
  const patients = useSelector(formattedPatientsDataSelector, shallowEqual);
  const professionals = useSelector(formattedProfessionalsDataSelector, shallowEqual);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  useEffect(() => {
    const foundProfessional = professionals?.find((item) => item.id === professional);
    setSelectedProfessional(foundProfessional);
    const foundPatient = patients?.find((item) => item.id === patient);
    setSelectedPatient(foundPatient);
  }, [professionals]);

  const classes = useStyles({ blocked, color: selectedProfessional?.color });

  return (
    <div className={classes.content}>
      <Grid container alignItems="flex-start" className={classes.titleContainer}>
        <Grid item xs={2} className={classes.textCenter}>
          <Lens className={classNames(classes.lens, classes.colorfulContent)} />
        </Grid>
        <Grid item xs={10}>
          <div className={classNames(classes.title, classes.dateAndTitle)}>
            {blocked ? NOT_AVAILABLE : `${selectedPatient?.name} ${selectedPatient?.surname}`}
          </div>
          <div className={classNames(classes.text, classes.dateAndTitle)}>
            {formatDate(startDate, { day: 'numeric', weekday: 'long' })}
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.contentContainer}>
        <Grid item xs={2} className={classes.textCenter}>
          <AccessTime color="action" />
        </Grid>
        <Grid item xs={10}>
          <div className={classes.text}>
            {`${formatDate(startDate, { hour: 'numeric', minute: 'numeric' })}
                - ${formatDate(endDate, { hour: 'numeric', minute: 'numeric' })}`}
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.contentContainer}>
        <Grid
          className={classNames(classes.contentItemIcon, classes.icon, classes.colorfulContent)}
          item
          xs={2}
        >
          <Person color="action" />
        </Grid>
        <Grid item xs={10}>
          <span className={classes.text}>
            {`${selectedProfessional?.name} ${selectedProfessional?.surname}`}
          </span>
        </Grid>
      </Grid>
      {!blocked && (
      <Grid container alignItems="center" className={classes.contentContainer}>
        <Grid
          className={classNames(classes.contentItemIcon, classes.icon, classes.colorfulContent)}
          item
          xs={2}
        >
          <PanToolIcon color="action" />
        </Grid>
        <Grid item xs={10}>
          <div className={classNames(classes.text, classes.colorfulContent)}>
            {getPracticesFullData(allPractices, practices)?.map((item) => (
              <Chip
                className={classes.chip}
                key={item.id}
                label={item.description}
              />
            ))}
          </div>
        </Grid>
      </Grid>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  appointmentData: PropTypes.shape({
    blocked: PropTypes.bool,
    endDate: PropTypes.string,
    patient: PropTypes.string,
    practices: PropTypes.arrayOf(PropTypes.string),
    professional: PropTypes.string,
    startDate: PropTypes.number,
  }),
  formatDate: PropTypes.func,
};

export default Tooltip;
