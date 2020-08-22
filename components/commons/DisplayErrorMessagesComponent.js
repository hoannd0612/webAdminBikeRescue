import { capitalize } from 'lodash/fp';
import React from 'react';
import { Alert } from '@material-ui/lab';
import { IconButton, Collapse } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const DisplayErrorMessagesComponent = ({
  messages = [],
  onDestroyMessages
}) => {
  const [open, setOpen] = React.useState(true);
  if (!messages || !messages.length) {
    return <div />;
  }

  if (typeof messages === 'string') {
    messages = [messages];
  }

  return (
    <>
      {messages.map((message, index) => (
        <Collapse key={index} in={open}>
          <Alert
            style={{ marginTop: 4, marginBottom: 4 }}
            severity="error"
            action={
              onDestroyMessages ? (
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                    typeof onDestroyMessages === 'function' &&
                      onDestroyMessages();
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              ) : null
            }
          >
            {capitalize(message)}
          </Alert>
        </Collapse>
      ))}
    </>
  );
};

export default DisplayErrorMessagesComponent;
