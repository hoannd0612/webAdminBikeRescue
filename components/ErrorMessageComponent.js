import React from 'react';

const ErrorMessageComponent = ({ errorMsgs = [] }) =>
  errorMsgs.map((error, index) => (
    <span style={{ color: 'red', display: 'block' }} key={index}>
      {error}{' '}
    </span>
  ));

export default ErrorMessageComponent;
