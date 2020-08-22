import React from 'react';
import {
  Button,
  makeStyles,
  Paper,
  InputBase,
  Divider
} from '@material-ui/core';

const copyToClipboard = str => {
  const textEle = document.createElement('textarea');
  textEle.value = str;
  document.body.appendChild(textEle);
  textEle.select();
  document.execCommand('copy');
  document.body.removeChild(textEle);
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    background: '#d9d9e4',
    border: '1px solid #d9d9e4'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  button: {
    padding: '5px auto',
    textTransform: 'none'
  },
  textField: {
    minWidth: '70%',
    [theme.breakpoints.down('sm')]: {
      minWidth: '40%'
    }
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

const CopyToClipBoardComponent = ({ text, copyToClipBoardStyles = {} }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} style={copyToClipBoardStyles} elevation={0}>
      <InputBase
        className={classes.input}
        readOnly={true}
        defaultValue={text}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        onClick={() => copyToClipboard(text)}
      >
        Copy to clipboard
      </Button>
    </Paper>
  );
};

export default CopyToClipBoardComponent;
