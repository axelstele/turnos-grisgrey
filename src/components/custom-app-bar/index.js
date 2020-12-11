import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { user } from 'redux/reducers/user';
import { global } from 'redux/reducers/global';
import { LOG_OUT_TEXT } from 'constants/custom-app-bar';
import {
  AppBar, IconButton, Menu, MenuItem, Toolbar, Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import formatTitle from 'utils/custom-app-bar';
import useStyles from './styles';

const CustomAppBar = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    dispatch(global.showDrawer());
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    dispatch(user.logOut());
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {formatTitle(history?.location.pathname)}
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogOut}>{LOG_OUT_TEXT}</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CustomAppBar;
