import React from 'react';

import AvatarComponent from '../AvatarComponent';
import UploadAvatarComponent from '../UploadAvatarComponent';
import { Grid } from '@material-ui/core';

const RenderImageFieldComponent = ({ meta, input: { value, onChange } }) => {
  return (
    <React.Fragment>
      <Grid container justify="center">
        <Grid item sm={8}>
          <Grid container justify="center">
            <AvatarComponent url={value} large />
          </Grid>

          <UploadAvatarComponent setUrlAvatar={onChange} />
          {meta.touched && meta.error && (
            <span style={{ color: 'red' }}>{meta.error}</span>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default RenderImageFieldComponent;
