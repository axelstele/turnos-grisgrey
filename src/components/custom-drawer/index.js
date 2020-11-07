import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Today from '@material-ui/icons/Today';
import Group from '@material-ui/icons/Group';
import { openDrawerSelector } from 'redux/selectors/global';
import { global } from 'redux/reducers/global';
import { Link } from 'react-router-dom';
import { HOME_PATHNAME, PROFESSIONALS_PATHNAME } from 'constants/routes';
import useStyles from './styles';

const CustomDrawer = () => {
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
          <ListItem button component={Link} to={HOME_PATHNAME}>
            <ListItemIcon><Today /></ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>
          <ListItem button component={Link} to={PROFESSIONALS_PATHNAME}>
            <ListItemIcon><Group /></ListItemIcon>
            <ListItemText primary="Professionals" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
