/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';
import { WeekView } from '@devexpress/dx-react-scheduler-material-ui';
import { dataSelector } from 'redux/selectors/holidays';
import moment from 'moment';
import { Tooltip } from '@material-ui/core';
import useStyles from '../styles';

const WeekViewTimeTableCell = ({ startDate, ...restProps }) => {
  const classes = useStyles();
  const holidaysData = useSelector(dataSelector, shallowEqual);

  const day = moment(startDate).date();
  const month = moment(startDate).month();
  const year = moment(startDate).year();
  const holiday = holidaysData[year]?.[month]?.[day];

  if (!holiday) {
    return <WeekView.TimeTableCell {...restProps} />;
  }

  return (
    <Tooltip title={holiday.description}>
      <WeekView.TimeTableCell className={classes.holiday} {...restProps} />
    </Tooltip>
  );
};

WeekViewTimeTableCell.propTypes = {
  startDate: PropTypes.instanceOf(Date),
};

export default WeekViewTimeTableCell;
