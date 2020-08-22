import React from 'react';
import { Tooltip, IconButton, Grid } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import { connect } from 'react-redux';
import { copyToClipboard } from '../../libs';
import { TOAST_SUCCESS } from '../../enums/actions';
const connectWithRedux = connect(null, dispatch => ({
  displayToast: (message, type = TOAST_SUCCESS) =>
    dispatch({
      type: type,
      notification: {
        message
      }
    })
}));

const getShortenHash = ({ content = '' }) => {
  return content.slice(0, 20) + '...';
};

function ShortenContentComponent({
  content,
  shorten = true,
  copyButton = true,
  displayToast
}) {
  return (
    <Grid container direction="row" wrap="nowrap" alignItems="center">
      {copyButton && (
        <IconButton
          onClick={() => {
            copyToClipboard(content);
            displayToast('Copy successful');
          }}
        >
          <FileCopy fontSize="small" />
        </IconButton>
      )}
      <Tooltip title={content} aria-label={content} placement="top">
        <div>{shorten ? getShortenHash({ content }) : content}</div>
      </Tooltip>
    </Grid>
  );
}

export default connectWithRedux(ShortenContentComponent);
