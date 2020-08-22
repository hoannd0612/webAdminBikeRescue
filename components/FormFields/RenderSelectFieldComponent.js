import React from 'react';
import { MenuItem, makeStyles, Grid, TextField } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    flexGrow: 1
  }
}));
export const RenderSelectFieldComponent = ({
  input,
  label,
  col,
  options,
  meta: { touched, error }
}) => {
  const classes = useStyles();
  return (
    <Grid item sm={col} xs={12} className={classes.root}>
      <TextField
        SelectProps={{
          displayEmpty: true
        }}
        fullWidth
        InputLabelProps={{ shrink: true }}
        margin="dense"
        select
        label={label}
        helperText={touched && error && error}
        variant="outlined"
        error={touched && error ? true : false}
        {...input}
      >
        {options.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  );
};

export default RenderSelectFieldComponent;
