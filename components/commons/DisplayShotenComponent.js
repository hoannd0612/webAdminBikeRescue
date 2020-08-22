import React from 'react';
import { Tooltip, Grid } from '@material-ui/core';

const getShortenValue = (value = ' ', character) => {
  return value.length > character ? value.slice(0, character) + '...' : value;
};

function DisplayShortenComponent({ children, shorten = true, character = 20 }) {
  if (!children) {
    return <div />;
  }
  return (
    <Grid container direction="row" wrap="nowrap" alignItems="center">
      <Tooltip title={children} placement="top">
        <span>{shorten ? getShortenValue(children, character) : children}</span>
      </Tooltip>
    </Grid>
  );
}

export default DisplayShortenComponent;
