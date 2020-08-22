import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  makeStyles,
  TextField
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1)
  }
}));
const SelectLayout = ({
  value,
  onChange,
  placeholder,
  options = [],
  label,
  variant = 'outlined',
  size = 'small',
  ...others
}) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      {label && (
        <InputLabel id={`controlled-open-select-label ${label}`}>
          {label}
        </InputLabel>
      )}
      <TextField
        size={size}
        style={{ width: 'fit-content' }}
        {...others}
        id="outlined-select-currency"
        select
        label={label}
        value={value}
        onChange={onChange}
        variant={variant}
      >
        {options.map(op => (
          <MenuItem key={op.value} value={op.value}>
            {op.label}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

export default SelectLayout;
