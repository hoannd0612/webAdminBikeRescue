import { Card, makeStyles, Divider } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2)
  }
}));
const CardSimpleLayout = ({
  header,
  body,
  style = {},
  footer,
  headerStyle = {},
  bodyStyle = {},
  footerStyle = {}
}) => {
  const classes = useStyles();
  return (
    <Card style={style} elevation={0}>
      {header && (
        <div className={classes.card} style={headerStyle}>
          {header}
        </div>
      )}
      {header && <Divider />}
      <div className={classes.card} style={bodyStyle}>
        {body}
      </div>
      {footer && <Divider />}
      {footer && (
        <div className={classes.card} style={footerStyle}>
          {footer}
        </div>
      )}
    </Card>
  );
};

export default CardSimpleLayout;
