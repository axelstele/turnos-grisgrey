/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';
import { DayView } from '@devexpress/dx-react-scheduler-material-ui';
import { formattedDataSelector } from 'redux/selectors/holidays';
import moment from 'moment';
import { Tooltip } from '@material-ui/core';
import useStyles from '../styles';

const WeekViewTimeTableCell = ({ startDate, ...restProps }) => {
  const classes = useStyles();
  const holidaysData = useSelector(formattedDataSelector, shallowEqual);

  const holiday = holidaysData?.find((item) => item.date === moment(startDate).format('DD/MM/YYYY'));

  if (!holiday) {
    return <DayView.TimeTableCell {...restProps} />;
  }

  return (
    <Tooltip title={holiday.description}>
      <DayView.TimeTableCell className={classes.holiday} {...restProps} />
    </Tooltip>
  );
};

WeekViewTimeTableCell.propTypes = {
  startDate: PropTypes.instanceOf(Date),
};

export default WeekViewTimeTableCell;
