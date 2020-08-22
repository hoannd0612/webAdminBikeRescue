import React from 'react';
import { Grid, Typography, makeStyles, Divider } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`
  }
}));

const FrameHeaderComponent = ({ children, title }) => {
  const classes = useStyles();
  return (
    <Grid>
      <Grid
        container
        className={classes.root}
        justify="space-between"
        alignItems="center"
        direction="row"
      >
        <Grid container justify="space-between">
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          {children}
        </Grid>
      </Grid>
      <Divider style={{ background: 'unset' }} />
    </Grid>
  );
};

export default FrameHeaderComponent;
