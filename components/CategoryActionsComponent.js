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
  AddNewCategoryDataSelector,
  AddNewCategoryErrorSelector,
  addNewCategory,
  getCategoryById,
  GetCategoryByIdDataSelector,
  GetCategoryByIdResetter,
  updateCategory
} from '../stores/CategoryState';
import RenderSwitchFieldComponent from './FormFields/RenderSwitchFieldComponent';
const connectToRedux = connect(
  createStructuredSelector({
    addCategorySuccessMessage: AddNewCategoryDataSelector,
    addCategoryErrorMessage: AddNewCategoryErrorSelector,
    initialValues: GetCategoryByIdDataSelector
  }),
  dispatch => ({
    onSubmit: values => {
      if ('status' in values) {
        dispatch(updateCategory(values));
      } else {
        dispatch(addNewCategory(values));
      }
    },
    getCategoryById: id => dispatch(getCategoryById(id)),
    resetData: () => dispatch(GetCategoryByIdResetter)
  })
);

const withForm = reduxForm({ form: 'addNewCategory' });
const enhance = compose(connectToRedux, withForm);

const CategoryActionsComponent = ({
  handleSubmit,
  pristine,
  submitting,
  reset,
  isUpdate = false,
  id,
  getCategoryById,
  resetData
}) => {
  useEffect(() => {
    if (id) {
      getCategoryById(id);
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
            name="categoryName"
            component={RenderFieldComponent}
            placeholder="Category Name"
            validate={[required]}
            label="Category name"
          />
          <Field
            col={12}
            name="description"
            component={RenderFieldComponent}
            placeholder="Description"
            label="Description"
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

export default enhance(CategoryActionsComponent);
