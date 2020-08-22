import React from 'react';
const CANCELED = 'CANCELED';
const CREATED = 'CREATED';
const ACCEPT = 'ACCEPT';
const ARRIVED = 'ARRIVED';
const REJECTED = 'REJECTED';
const FINISHED = 'FINISHED';

import {
  Done,
  CancelPresentation,
  AvTimer,
  Block,
  PlaylistAddCheck,
  DirectionsBike,
  DoneAll
} from '@material-ui/icons';
import { Grid } from '@material-ui/core';

const getUserStatusIcon = ({ status }) => {
  switch (status) {
    case ARRIVED:
      return <DirectionsBike fontSize="small" style={{ color: '#4caf50' }} />;
    case CREATED:
      return <PlaylistAddCheck fontSize="small" style={{ color: '#4caf50' }} />;
    case ACCEPT:
      return <Done fontSize="small" style={{ color: '#4caf50' }} />;
    case CANCELED:
    case REJECTED:
      return <CancelPresentation fontSize="small" style={{ color: 'red' }} />;
    case FINISHED:
      return <DoneAll fontSize="small" style={{ color: '#4caf50' }} />;
    default:
      break;
  }
};

const RequestStatusComponent = ({ status }) => (
  <Grid container alignItems="center">
    {getUserStatusIcon({ status })}
    <span>&nbsp;</span>
    {status}
  </Grid>
);

export default RequestStatusComponent;
