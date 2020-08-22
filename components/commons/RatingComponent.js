import React from 'react';
import { Star } from '@material-ui/icons';
import { Grid } from '@material-ui/core';

const RatingComponent = ({ star }) => {
  if (star == -1 || !star) {
    return 'Chưa có đánh giá';
  }
  return (
    <Grid>
      <Grid container direction="row" alignItems="center">
        {Math.round(star * 10) / 10} <div>&nbsp;&nbsp;</div>{' '}
        <Star style={{ color: '#cfcf0c' }} />
      </Grid>
    </Grid>
  );
};
export default RatingComponent;
