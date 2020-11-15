import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import Today from '@material-ui/icons/Today';
import Group from '@material-ui/icons/Group';
import { openDrawerSelector } from 'redux/selectors/global';
import { global } from 'redux/reducers/global';
import { Link, useHistory } from 'react-router-dom';
import { HOME_PATHNAME, PROFESSIONALS_PATHNAME } from 'constants/routes';
import { CALENDAR_TEXT, PROFESSIONALS_TEXT } from 'constants/custom-drawer';
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
            <ListItemIcon><Today /></ListItemIcon>
            <ListItemText primary={CALENDAR_TEXT} />
          </ListItem>
          <ListItem
            button
            component={Link}
            selected={history?.location.pathname === PROFESSIONALS_PATHNAME}
            to={PROFESSIONALS_PATHNAME}
          >
            <ListItemIcon><Group /></ListItemIcon>
            <ListItemText primary={PROFESSIONALS_TEXT} />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
