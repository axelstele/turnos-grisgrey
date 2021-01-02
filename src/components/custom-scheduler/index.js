import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  DateNavigator,
  DayView,
  Scheduler,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { connectProps } from '@devexpress/dx-react-core';
import { calendar } from 'redux/reducers/calendar';
import { formattedDataSelector } from 'redux/selectors/appointments';
import { appointments } from 'redux/reducers/appointments';
import { DAY_VIEW_TEXT, WEEK_VIEW_TEXT } from 'constants/custom-scheduler';
import CustomOverlay from './custom-overlay';
import Tooltip from './tooltip';
import Appointment from './appointment';
import ConfirmationDialogLayout from './confirmation-dialog-layout';
import WeekViewTimeTableCell from './time-table-cell/week-view';
import DayViewTimeTableCell from './time-table-cell/day-view';

const CustomScheduler = () => {
  const dispatch = useDispatch();
  const [appointment, setAppointment] = useState({});
  const [appointmentFormVisible, setAppointmentFormVisible] = useState(false);
  const appointmentsData = useSelector(formattedDataSelector, shallowEqual);

  const handleAppointmentOpen = (appointmentData) => {
    if (appointmentData && Object.keys(appointmentData).length) {
      setAppointment(appointmentData);
      setAppointmentFormVisible(!appointmentFormVisible);
    }
  };

  const handleAppointmentFormClose = () => {
    setAppointmentFormVisible(!appointmentFormVisible);
    setAppointment({});
  };

  const handleCommitChanges = ({ deleted }) => {
    dispatch(appointments.remove({ id: deleted }));
  };

  useEffect(() => {
    dispatch(calendar.get());
  }, []);

  return (
    <Paper>
      <Scheduler
        data={appointmentsData}
        firstDayOfWeek={1}
        locale="es-AR"
      >
        <EditingState
          onAddedAppointmentChange={handleAppointmentOpen}
          onCommitChanges={handleCommitChanges}
          onEditingAppointmentChange={handleAppointmentOpen}
        />
        <IntegratedEditing />
        <ViewState
          defaultCurrentDate={moment().format('YYYY-MM-DD')}
          defaultCurrentViewName={WEEK_VIEW_TEXT}
        />
        <DayView
          cellDuration={60}
          endDayHour={20}
          name={DAY_VIEW_TEXT}
          startDayHour={8}
          timeTableCellComponent={DayViewTimeTableCell}
        />
        <WeekView
          cellDuration={60}
          endDayHour={20}
          name={WEEK_VIEW_TEXT}
          startDayHour={8}
          timeTableCellComponent={WeekViewTimeTableCell}
        />
        <Toolbar />
        <ViewSwitcher />
        <ConfirmationDialog layoutComponent={ConfirmationDialogLayout} />
        <Appointments
          appointmentComponent={Appointment}
        />
        <AppointmentTooltip
          contentComponent={Tooltip}
          showOpenButton
          showCloseButton
          showDeleteButton
        />
        {appointment && (
        <AppointmentForm
          overlayComponent={connectProps(CustomOverlay, () => ({
            appointmentData: appointment,
            handleClose: handleAppointmentFormClose,
            visible: appointmentFormVisible,
          }))}
        />
        )}
        <DateNavigator />
      </Scheduler>
    </Paper>
  );
};

export default CustomScheduler;
