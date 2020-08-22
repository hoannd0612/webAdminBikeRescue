import React, { useState, useEffect } from 'react';
import RLink from '../layouts/RLink';
import { connect } from 'react-redux';
import {
  IconButton,
  Menu,
  makeStyles,
  Divider,
  MenuItem,
  Typography
} from '@material-ui/core';
import {
  AccountCircle,
  PersonOutline,
  ExitToApp,
  VpnKey,
  Settings,
  HelpOutline
} from '@material-ui/icons';
import { removeToken } from '../libs/token-libs';
import Router from 'next/router';

const connectToRedux = connect(null, dispatch => ({
  logout: () =>
    dispatch(function() {
      removeToken();
      Router.push('/login');
    })
}));

const useStyles = makeStyles(theme => ({
  accountName: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px 36px',
    outline: 'none'
  },
  menuItem: {
    color: '#25252a',
    '&:hover': {
      color: '#3f51b5'
    },
    height: theme.spacing(6),
    fontSize: 14
  }
}));

const HeaderUserInfoComponent = ({ user, logout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {}, [anchorEl]);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
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
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={classes.accountName}>
          <Typography variant="button" display="block" gutterBottom>
            {user ? user.fullName : ' Anonymous'}
          </Typography>
          <Typography variant="body2" display="block" gutterBottom>
            Admin | Moderator
          </Typography>
        </div>
        <Divider />
        <RLink href="/profile">
          <MenuItem className={classes.menuItem} onClick={handleClose}>
            <PersonOutline fontSize="small" /> <div>&nbsp;&nbsp;</div> Profile
          </MenuItem>
        </RLink>
        <RLink href="/changepassword">
          <MenuItem className={classes.menuItem} onClick={handleClose}>
            <VpnKey fontSize="small" /> <div>&nbsp;&nbsp;</div> Change Password
          </MenuItem>
        </RLink>
        <RLink href="/settings/account-setting">
          <MenuItem className={classes.menuItem} onClick={handleClose}>
            <Settings fontSize="small" /> <div>&nbsp;&nbsp;</div> Settings
          </MenuItem>
        </RLink>
        <RLink href="">
          <MenuItem className={classes.menuItem} onClick={handleClose}>
            <HelpOutline fontSize="small" /> <div>&nbsp;&nbsp;</div> Help
          </MenuItem>
        </RLink>
        <MenuItem
          className={classes.menuItem}
          onClick={() => {
            logout();
            handleClose();
          }}
        >
          <ExitToApp />
          <div>&nbsp;&nbsp;</div> Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default connectToRedux(HeaderUserInfoComponent);
