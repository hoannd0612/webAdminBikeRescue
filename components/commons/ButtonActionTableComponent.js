import { Tooltip, IconButton } from '@material-ui/core';
import React from 'react';

const ButtonActionTableComponent = ({ label, action, icon }) => (
  <Tooltip title={label}>
    <IconButton onClick={action}>{icon}</IconButton>
  </Tooltip>
);

export default ButtonActionTableComponent;
