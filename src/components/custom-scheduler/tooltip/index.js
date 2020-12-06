import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Lens from '@material-ui/icons/Lens';
import AccessTime from '@material-ui/icons/AccessTime';
import { Chip, Grid } from '@material-ui/core';
import { useSelector, shallowEqual } from 'react-redux';
import { formattedDataSelector as formattedPracticesDataSelector } from 'redux/selectors/practices';
import { formattedDataSelector as formattedProfessionalsDataSelector } from 'redux/selectors/professionals';
import classNames from 'clsx';
import Person from '@material-ui/icons/Person';
import getPracticesFullData from 'utils/practices';
import PanToolIcon from '@material-ui/icons/PanTool';
import useStyles from './styles';

const Tooltip = ({
  appointmentData: {
    endDate, startDate, professional, title, practices,
  }, formatDate,
}) => {
  const allPractices = useSelector(formattedPracticesDataSelector, shallowEqual);
  const professionals = useSelector(formattedProfessionalsDataSelector, shallowEqual);
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
          <div className={classNames(classes.title, classes.dateAndTitle)}>
            {title}
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
            {`${professionalSelected?.name} ${professionalSelected?.surname}`}
          </span>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.contentContainer}>
        <Grid
          className={classNames(classes.contentItemIcon, classes.icon, classes.colorfulContent)}
          item
          xs={2}
        >
          <PanToolIcon color="action" />
        </Grid>
        <Grid item xs={10}>
          <span className={classNames(classes.text, classes.colorfulContent)}>
            {getPracticesFullData(allPractices, practices)?.map((item) => (
              <Chip
                className={classes.chip}
                key={item.id}
                label={item.description}
              />
            ))}
          </span>
        </Grid>
      </Grid>
    </div>
  );
};

Tooltip.propTypes = {
  appointmentData: PropTypes.shape({
    endDate: PropTypes.string,
    practices: PropTypes.arrayOf(PropTypes.string),
    professional: PropTypes.string,
    startDate: PropTypes.number,
    title: PropTypes.string,
  }),
  formatDate: PropTypes.func,
};

export default Tooltip;
