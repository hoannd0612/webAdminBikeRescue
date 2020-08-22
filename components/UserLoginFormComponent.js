import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Link from 'next/link';
import { createStructuredSelector } from 'reselect';

import Button from '../layouts/Button';
import { doFunctionWithEnter } from '../utils';
import {
  Container,
  CssBaseline,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  withStyles,
  Box
} from '@material-ui/core';
import DisplayErrorMessagesComponent from '../components/commons/DisplayErrorMessagesComponent';
import { loginUserErrorMessageSelector, loginUser } from '../stores/userState';
import CopyrightComponent from './CopyrightComponent';

const connectToRedux = connect(
  createStructuredSelector({
    errorMessages: loginUserErrorMessageSelector
  }),
  (dispatch) => ({
    doLogin: (username, password) =>
      username && password && dispatch(loginUser(username, password))
  })
);

const style = (theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  title: {
    color: '#25628f',
    marginBottom: theme.spacing(5),
    fontWeight: 700
  },
  boxAtSmall: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(2)
    }
  }
});
const enhance = compose(connectToRedux, withStyles(style));

const LoginFormComponent = ({ doLogin, classes, errorMessages }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const usernameEle = document.getElementById('input-group-icon-username');
    const passwordEle = document.getElementById('input-group-icon-password');
    setUsername(usernameEle.value);
    setPassword(passwordEle.value);
  }, [setUsername, setPassword]);
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      style={{ minHeight: '100vh' }}
    >
      <Typography className={classes.title} component="h1" variant="h4">
        Admin Login
      </Typography>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={clsx(classes.paper, 'shadow-2')}>
          <Typography component="h1" variant="h6">
            Login Form
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              onChange={(e) => setUsername(e.currentTarget.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="input-group-icon-username"
              label="Username"
              autoFocus
            />
            <TextField
              onChange={(e) => setPassword(e.currentTarget.value)}
              onKeyPress={(event) =>
                doFunctionWithEnter(event, () => {
                  event.preventDefault();
                  doLogin(username, password);
                })
              }
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="input-group-icon-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                doLogin(username, password);
              }}
            >
              Login
            </Button>
            <div style={{ textAlign: 'center' }}>
              <div>
                <Link href="#">
                  <a>Forgot password</a>
                </Link>
              </div>
              <div>
                <Link href="/#">
                  <a>Don't have an account? Sign Up</a>
                </Link>
              </div>
            </div>
            <DisplayErrorMessagesComponent messages={errorMessages} />
          </form>
        </div>
        <Box className={classes.boxAtSmall} mt={30}>
          <Grid container justify="space-around">
            <CopyrightComponent link="https://dev-blogs.netlify.com/">
              Thaind
            </CopyrightComponent>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
};

export default enhance(LoginFormComponent);
