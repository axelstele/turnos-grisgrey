import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Lens from '@material-ui/icons/Lens';
import AccessTime from '@material-ui/icons/AccessTime';
import Grid from '@material-ui/core/Grid';
import { useSelector, shallowEqual } from 'react-redux';
import { formattedDataSelector } from 'redux/selectors/professionals';
import classNames from 'clsx';
import Person from '@material-ui/icons/Person';
import useStyles from './styles';

const Tooltip = ({
  appointmentData: {
    endDate, startDate, professional, title,
  }, formatDate,
}) => {
  const professionals = useSelector(formattedDataSelector, shallowEqual);
  const [professionalSelected, setProfessionalSelected] = useState(null);

  useEffect(() => {
    const foundProfessional = professionals?.find((item) => item.id === professional);
    setProfessionalSelected(foundProfessional);
  }, [professionals]);

  const classes = useStyles({ color: professionalSelected?.color });

  return (
    <div className={classes.content}>
      <Grid container alignItems="flex-start" className={classes.titleContainer}>
        <Grid item xs={2} className={classes.textCenter}>
          <Lens className={classNames(classes.lens, classes.colorfulContent)} />
        </Grid>
        <Grid item xs={10}>
          <div>
            <div className={classNames(classes.title, classes.dateAndTitle)}>
              {title}
            </div>
            <div className={classNames(classes.text, classes.dateAndTitle)}>
              {formatDate(startDate, { day: 'numeric', weekday: 'long' })}
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.contentContainer}>
        <Grid item xs={2} className={classes.textCenter}>
          <AccessTime className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <div className={classes.text}>
            {`${formatDate(startDate, { hour: 'numeric', minute: 'numeric' })}
                - ${formatDate(endDate, { hour: 'numeric', minute: 'numeric' })}`}
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid
          className={classNames(classes.contentItemIcon, classes.icon, classes.colorfulContent)}
          item
          xs={2}
        >
          <Person className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <span className={classNames(classes.text, classes.colorfulContent)}>
            {`${professionalSelected?.name} ${professionalSelected?.surname}`}
          </span>
        </Grid>
      </Grid>
    </div>
  );
};

Tooltip.propTypes = {
  appointmentData: PropTypes.shape({
    endDate: PropTypes.string,
    professional: PropTypes.string,
    startDate: PropTypes.number,
    title: PropTypes.string,
  }),
  formatDate: PropTypes.func,
};

export default Tooltip;
