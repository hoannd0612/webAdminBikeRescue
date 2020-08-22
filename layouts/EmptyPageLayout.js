import React from 'react';
import { CssBaseline } from '@material-ui/core';

function EmptyPageLayout({ children }) {
  return (
    <div>
      <CssBaseline />
      <main>{children}</main>
    </div>
  );
}

export default EmptyPageLayout;
