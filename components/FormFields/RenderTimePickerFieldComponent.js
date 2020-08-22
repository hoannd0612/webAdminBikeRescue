import React from 'react';
import clsx from 'clsx';
import { TextField, makeStyles, Grid } from '@material-ui/core';
import { Fragment } from 'react';
import { TimePicker } from '@material-ui/pickers';
const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    flexGrow: 1
  }
}));
const RenderTimePickerFieldComponent = ({
  input: { value, onChange },
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
        <TimePicker
          autoOk
          renderInput={props => (
            <TextField
              {...props}
              margin="dense"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: label ? true : false
              }}
              helperText={touched && error && error}
              error={touched && error ? true : false}
              placeholder={placeholder}
              label={label}
              {...others}
            />
          )}
          onChange={newValue => {
            onChange(newValue);
          }}
          value={value}
        />
      </Grid>
    </Fragment>
  );
};

export default RenderTimePickerFieldComponent;
