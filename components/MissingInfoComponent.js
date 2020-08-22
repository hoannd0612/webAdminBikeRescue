import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(6)
  },
  sorryText: {
    opacity: 0.1,
    fontSize: theme.spacing(16)
  },
  children: {
    padding: theme.spacing(6),
    textAlign: 'center'
  }
}));
const MissingInfoComponent = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      justify="center"
      alignItems="center"
      direction="column"
    >
      <Typography variant="h2" className={classes.sorryText}>
        Sorry
      </Typography>
      <Grid item lg={8}>
        <Grid
          className={classes.children}
          container
          direction="column"
          justify="center"
        >
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MissingInfoComponent;
