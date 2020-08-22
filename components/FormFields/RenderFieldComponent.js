import React from 'react';
import clsx from 'clsx';
import { TextField, makeStyles, Grid } from '@material-ui/core';
import { Fragment } from 'react';
const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    flexGrow: 1
  }
}));
const RenderFieldComponent = ({
  input,
  col = 6,
  placeholder,
  label,
  className = {},
  meta: { touched, error },
  ...others
}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid item sm={col} xs={12} className={classes.root}>
        <TextField
          {...input}
          fullWidth
          InputLabelProps={{
            shrink: label ? true : false
          }}
          error={touched && error ? true : false}
          placeholder={placeholder}
          label={label}
          className={clsx(classes.textField, className)}
          helperText={touched && error && error}
          margin="dense"
          variant="outlined"
          {...others}
        />
      </Grid>
    </Fragment>
  );
};

export default RenderFieldComponent;
