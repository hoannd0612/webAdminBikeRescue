import { Field, reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import React, { useEffect, Fragment } from 'react';

import Button from '../layouts/Button';
import { Grid } from '@material-ui/core';
import RenderFieldComponent from './FormFields/RenderFieldComponent';

import { required } from '../utils/validation';

import {
  AddNewConfigDataSelector,
  AddNewConfigErrorSelector,
  addNewConfig,
  getConfigById,
  GetConfigByIdDataSelector,
  GetConfigByIdResetter,
  updateConfig
} from '../stores/ConfigState';
import RenderSwitchFieldComponent from './FormFields/RenderSwitchFieldComponent';
const connectToRedux = connect(
  createStructuredSelector({
    addConfigSuccessMessage: AddNewConfigDataSelector,
    addConfigErrorMessage: AddNewConfigErrorSelector,
    initialValues: GetConfigByIdDataSelector
  }),
  dispatch => ({
    onSubmit: values => {
      if ('status' in values) {
        dispatch(updateConfig(values));
      } else {
        dispatch(addNewConfig(values));
      }
    },
    getConfigById: id => dispatch(getConfigById(id)),
    resetData: () => dispatch(GetConfigByIdResetter)
  })
);

const withForm = reduxForm({ form: 'addNewConfig' });
const enhance = compose(connectToRedux, withForm);

const ConfigActionsComponent = ({
  handleSubmit,
  pristine,
  submitting,
  reset,
  isUpdate = false,
  id,
  getConfigById,
  resetData
}) => {
  useEffect(() => {
    if (id) {
      getConfigById(id);
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
            col={12}
            name="name"
            component={RenderFieldComponent}
            placeholder="Config Name"
            validate={[required]}
            label="Config name"
          />
          <Field
            col={12}
            name="value"
            component={RenderFieldComponent}
            placeholder="Value"
            label="Value"
          />
          {isUpdate && (
            <Field
              col={12}
              name="status"
              component={RenderSwitchFieldComponent}
              label="Status"
            />
          )}
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

export default enhance(ConfigActionsComponent);
