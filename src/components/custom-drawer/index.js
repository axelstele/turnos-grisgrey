import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import Today from '@material-ui/icons/Today';
import Group from '@material-ui/icons/Group';
import PanToolIcon from '@material-ui/icons/PanTool';
import { EventBusy, Face } from '@material-ui/icons';
import { openDrawerSelector } from 'redux/selectors/global';
import { global } from 'redux/reducers/global';
import { Link, useHistory } from 'react-router-dom';
import {
  HOLIDAYS_PATHNAME, HOME_PATHNAME, PATIENTS_PATHNAME, PRACTICES_PATHNAME, PROFESSIONALS_PATHNAME,
} from 'constants/routes';
import {
  CALENDAR_TEXT, HOLIDAYS_TEXT, PATIENTS_TEXT, PRACTICES_TEXT, PROFESSIONALS_TEXT,
} from 'constants/custom-drawer';

import useStyles from './styles';

const CustomDrawer = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const openDrawer = useSelector(openDrawerSelector, shallowEqual);

  const handleDrawerClose = () => {
    dispatch(global.hideDrawer());
  };

  const handleListClick = () => {
    handleDrawerClose();
  };

  return (
    <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
      <div
        className={classes.list}
        role="presentation"
        onClick={handleListClick}
        onKeyDown={handleListClick}
      >
        <List>
          <ListItem
            button
            component={Link}
            selected={history?.location.pathname === HOME_PATHNAME}
            to={HOME_PATHNAME}
          >
            <ListItemIcon>
              <Today />
            </ListItemIcon>
            <ListItemText primary={CALENDAR_TEXT} />
          </ListItem>
          <ListItem
            button
            component={Link}
            selected={history?.location.pathname === PROFESSIONALS_PATHNAME}
            to={PROFESSIONALS_PATHNAME}
          >
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary={PROFESSIONALS_TEXT} />
          </ListItem>
          <ListItem
            button
            component={Link}
            selected={history?.location.pathname === PRACTICES_PATHNAME}
            to={PRACTICES_PATHNAME}
          >
            <ListItemIcon>
              <PanToolIcon />
            </ListItemIcon>
            <ListItemText primary={PRACTICES_TEXT} />
          </ListItem>
          <ListItem
            button
            component={Link}
            selected={history?.location.pathname === PATIENTS_PATHNAME}
            to={PATIENTS_PATHNAME}
          >
            <ListItemIcon>
              <Face />
            </ListItemIcon>
            <ListItemText primary={PATIENTS_TEXT} />
          </ListItem>
          <ListItem
            button
            component={Link}
            selected={history?.location.pathname === HOLIDAYS_PATHNAME}
            to={HOLIDAYS_PATHNAME}
          >
            <ListItemIcon>
              <EventBusy />
            </ListItemIcon>
            <ListItemText primary={HOLIDAYS_TEXT} />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
