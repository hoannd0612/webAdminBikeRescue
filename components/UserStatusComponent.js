import React from 'react';
import { ACTIVE, BANNED } from '../enums/status';

import { Done, Block } from '@material-ui/icons';
import { Grid } from '@material-ui/core';

const getUserStatusLabel = ({ status }) => {
  switch (status) {
    case ACTIVE:
      return 'Active';
    case BANNED:
      return 'Banned';
    default:
      return '';
  }
};
const getUserStatusIcon = ({ status }) => {
  switch (status) {
    case ACTIVE:
      return <Done fontSize="small" style={{ color: 'green' }} />;
    case BANNED:
      return <Block fontSize="small" style={{ color: 'red' }} />;
    default:
      break;
  }
};

const UserStatusComponent = ({ status }) => (
  <Grid container alignItems="center">
    {getUserStatusIcon({ status })}
    <span>&nbsp;</span>
    {getUserStatusLabel({ status })}
  </Grid>
);

export default UserStatusComponent;
