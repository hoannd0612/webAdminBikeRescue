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

const connectWithRedux = connect(null, (dispatch) => ({
  displayToast: (message, type = TOAST_SUCCESS) =>
    dispatch({
      type: type,
      notification: {
        message
      }
    })
}));

const enhance = compose(connectWithRedux);

const useStyles = makeStyles((theme) => ({
  buttonToast: {
    margin: theme.spacing(2)
  }
}));

const GreenButton = withStyles((theme) => ({
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
    <Grid container>
      <Grid>
        <Typography variant="h5" display="block" gutterBottom>
          1. Display Toast Notification
        </Typography>
        <GreenButton
          className={classes.buttonToast}
          color="primary"
          onClick={() => displayToast('This is a success message toast')}
        >
          Toast Success
        </GreenButton>
        <Button
          className={classes.buttonToast}
          color="secondary"
          onClick={() =>
            displayToast('This is a error message toast', TOAST_ERROR)
          }
        >
          Toast Error
        </Button>
        <Button
          className={classes.buttonToast}
          color="default"
          onClick={() =>
            displayToast('This is a default message toast', TOAST_DEFAULT)
          }
        >
          Toast Default
        </Button>
        <Button
          className={classes.buttonToast}
          color="primary"
          onClick={() =>
            displayToast('This is a info message toast', TOAST_INFO)
          }
        >
          Toast Info
        </Button>
      </Grid>
    </Grid>
  );
};

export default enhance(DashboardComponent);
