import React from 'react';
import Link from 'next/link';
import { makeStyles, Paper } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing(1),
    color: '#9e9b9b',
    margin: 4,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));
const getSizeNumberBySize = ({ small, medium, large }) => {
  switch (true) {
    case small:
      return 20;
    case medium:
      return 40;
    case large:
      return 60;
    default:
      return 40;
  }
};
const IconComponent = ({ icon, link, small, medium, large, doOnClick }) => {
  const sizeNumber = getSizeNumberBySize({ small, medium, large });
  const classes = useStyles();
  return (
    <Paper
      style={{ width: sizeNumber, height: sizeNumber }}
      elevation={1}
      className={classes.root}
      onClick={event => doOnClick(event)}
    >
      {link ? <Link href={link}>{icon}</Link> : icon}
    </Paper>
  );
};

export default IconComponent;
