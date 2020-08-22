import React from 'react';
import { Typography } from '@material-ui/core';

function CopyrightComponent({ children, link }) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a href={link}>{children}</a> All rights reserved{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
export default CopyrightComponent;
