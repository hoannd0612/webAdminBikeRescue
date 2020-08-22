import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, makeStyles, withStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import {
  TOAST_SUCCESS,
  TOAST_ERROR,
  TOAST_DEFAULT,
  TOAST_INFO
} from '../enums/actions';
import { compose } from 'recompose';
import Button from '../layouts/Button';

const connectWithRedux = connect(null, dispatch => ({
  displayToast: (message, type = TOAST_SUCCESS) =>
    dispatch({
      type: type,
      notification: {
        message
      }
    })
}));

const enhance = compose(connectWithRedux);

const useStyles = makeStyles(theme => ({
  buttonToast: {
    margin: theme.spacing(2)
  }
}));

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  }
}))(Button);

const DashboardComponent = ({ displayToast }) => {
  const classes = useStyles();
  return (
    <Grid
      style={{ background: '#fff', minHeight: '100vh' }}
      justify="center"
      alignItems="center"
      container
    >
      <img width={400} alt="logo" src="/static/images/logo.png" />
    </Grid>
  );
};

export default enhance(DashboardComponent);
