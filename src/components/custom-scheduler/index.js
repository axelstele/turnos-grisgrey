import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { connectProps } from '@devexpress/dx-react-core';
import { appointments } from 'redux/reducers/appointments';
import { formattedDataSelector } from 'redux/selectors/appointments';
import CustomLayout from './custom-layout';

const CustomScheduler = () => {
  const dispatch = useDispatch();
  const [addedAppointment, setAddedAppointment] = useState({});
  const [formAppointmentVisible, setFormAppointmentVisible] = useState(false);
  const appointmentsData = useSelector(formattedDataSelector, shallowEqual);

  const handleAddedAppointmentChange = (added) => {
    setFormAppointmentVisible(true);
    setAddedAppointment(added);
  };

  useEffect(() => {
    dispatch(appointments.get());
  }, []);

  return (
    <Paper>
      <Scheduler data={appointmentsData}>
        <EditingState
          onAddedAppointmentChange={handleAddedAppointmentChange}
        />
        <ViewState
          defaultCurrentDate={moment().format('YYYY-MM-DD')}
          defaultCurrentViewName="Week"
        />
        <DayView
          startDayHour={8}
          endDayHour={20}
        />
        <WeekView
          startDayHour={8}
          endDayHour={20}
        />
        <Toolbar />
        <ViewSwitcher />
        <Appointments />
        <AppointmentTooltip />
        <AppointmentForm
          overlayComponent={connectProps(CustomLayout, () => ({
            appointmentData: addedAppointment,
            setFormAppointmentVisible,
            visible: formAppointmentVisible,
          }))}
        />
        <DateNavigator />
      </Scheduler>
    </Paper>
  );
};

export default CustomScheduler;
