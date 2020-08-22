import React from 'react';

import { TextField } from '@material-ui/core';

const InputText = React.forwardRef(
  ({ label, onChange, disabled, ...others }, ref) => (
    <TextField
      size="small"
      ref={ref}
      fullWidth
      label={label}
      onChange={e => onChange(e)}
      disabled={disabled}
      variant="outlined"
      {...others}
    />
  )
);

export default InputText;
