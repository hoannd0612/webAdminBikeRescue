import { Field, reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import React, { useEffect, Fragment } from 'react';

import Button from '../layouts/Button';
import { Grid } from '@material-ui/core';
import RenderFieldComponent from './FormFields/RenderFieldComponent';

import { required, emailValidation } from '../utils/validation';
import RenderSwitchFieldComponent from './FormFields/RenderSwitchFieldComponent';
import RenderTimePickerFieldComponent from './FormFields/RenderTimePickerFieldComponent';
import {
  addNewUser,
  getUserById,
  GetUserByIdResetter,
  GetUserByIdDataSelector,
  updateUser,
  AddNewUserResetter
  // updateUser
} from '../stores/userState';
import { getDistricts, GetDistrictsDataSelector } from '../stores/ShopState';
import { formatAMPM } from '../utils';
import RenderImageFieldComponent from './FormFields/RenderImageFieldComponent';
import { getUserID } from '../libs/user-libs';
const connectToRedux = connect(
  createStructuredSelector({
    initialValues: GetUserByIdDataSelector,
    districtData: GetDistrictsDataSelector
  }),
  dispatch => ({
    onSubmit: values => {
      if ('status' in values) {
        dispatch(updateUser(values));
      } else {
        dispatch(addNewUser(values));
      }
    },
    getUserById: id => {
      dispatch(getUserById(id));
    },
    resetData: () => {
      dispatch(AddNewUserResetter);
      dispatch(GetUserByIdResetter);
    }
  })
);

const withForm = reduxForm({ form: 'addNewUser' });
const enhance = compose(connectToRedux, withForm);

const UserActionComponent = ({
  handleSubmit,
  pristine,
  submitting,
  reset,
  isUpdate = false,
  id,
  getUserById,
  resetData
}) => {
  useEffect(() => {
    if (id) {
      getUserById(id);
    }
    return () => {
      resetData();
    };
  }, [id]);
  return (
    <Grid container>
      <form onSubmit={handleSubmit}>
        <Grid container direction="row">
          <Field
            col={6}
            name="fullName"
            component={RenderFieldComponent}
            placeholder="Full Name"
            validate={[required]}
            label="Full Name"
          />
          {!isUpdate && (
            <Field
              col={6}
              name="password"
              component={props => (
                <RenderFieldComponent
                  {...props}
                  type="password"
                  autoComplete="new-password"
                />
              )}
              placeholder="Password"
              validate={[required]}
              label="Password"
            />
          )}
          <Field
            col={6}
            name="email"
            component={RenderFieldComponent}
            placeholder="Email"
            label="Email"
            validate={[required, emailValidation]}
          />
          <Field
            col={6}
            name="phoneNumber"
            component={RenderFieldComponent}
            placeholder="Phone Number"
            label="Phone Number"
            validate={[required]}
          />
          <Field
            col={6}
            name="address"
            component={RenderFieldComponent}
            placeholder="Address"
            label="Address"
            validate={[required]}
          />

          {isUpdate && (
            <Field
              col={6}
              name="status"
              component={RenderSwitchFieldComponent}
              label="Status"
            />
          )}
          <Field col={6} name="avtUrl" component={RenderImageFieldComponent} />
          <Grid container justify="center">
            <Grid>
              <Button type="submit" disabled={pristine || submitting}>
                Submit
              </Button>
              <Button
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default enhance(UserActionComponent);
