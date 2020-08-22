import { Field, reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import React from 'react';

import Button from '../layouts/Button';
import { Grid } from '@material-ui/core';
import RenderFieldComponent from './FormFields/RenderFieldComponent';

import { roleName, required } from '../utils/validation';
import {
  addNewRole,
  AddNewRoleErrorSelector,
  AddNewRoleDataSelector
} from '../stores/RoleState';
const connectToRedux = connect(
  createStructuredSelector({
    addRoleSuccessMessage: AddNewRoleDataSelector,
    addRoleErrorMessage: AddNewRoleErrorSelector
  }),
  dispatch => ({
    onSubmit: values => {
      dispatch(addNewRole(values.roleName));
    }
  })
);

const withForm = reduxForm({ form: 'addNewRole' });
const enhance = compose(connectToRedux, withForm);

const RoleAddingComponent = ({
  handleSubmit,
  pristine,
  submitting,
  errorMessages,
  reset
}) => {
  return (
    <Grid container>
      <form onSubmit={handleSubmit}>
        <Grid container direction="row">
          <Field
            col={12}
            name="roleName"
            component={RenderFieldComponent}
            placeholder="Role name"
            validate={[required, roleName]}
            label="Role name"
          />
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

export default enhance(RoleAddingComponent);
