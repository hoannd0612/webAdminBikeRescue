import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Button from '../layouts/Button';

import { Grid } from '@material-ui/core';
import AlertDialog from '../layouts/AlertDialog';
import { CloudUpload } from '@material-ui/icons';

class UploadAvatarComponent extends Component {
  state = {
    currentAvatar: '',
    isOpenModal: false
  };
  setIsOpenModal = status => {
    this.setState({ ...this.state, isOpenModal: status });
  };
  setEditorRef = editor => (this.editor = editor);
  onImageChange = elem => {
    const file = elem.target.files[0];
    this.setState({ currentAvatar: file });
  };
  onClickSave = () => {
    const { setUrlAvatar } = this.props;
    if (typeof setUrlAvatar !== 'function') {
      return;
    }
    if (this.editor) {
      const canvasScaledBase64 = this.editor
        .getImageScaledToCanvas()
        .toDataURL();

      typeof setUrlAvatar === 'function' && setUrlAvatar(canvasScaledBase64);

      this.setIsOpenModal(false);
    }
  };
  render() {
    const { currentAvatar, isOpenModal } = this.state;
    return (
      <Grid container justify="center">
        <Grid>
          <Button onClick={() => this.setIsOpenModal(true)}>Upload</Button>
          <AlertDialog
            title="upload image"
            isOpenDialog={isOpenModal}
            setIsOpenDialog={this.setIsOpenModal}
            onOk={() => this.onClickSave()}
            okText="Ok"
            onCancel={() => this.setIsOpenModal(false)}
            cancelText="Cancel"
            destroyOnOk={!currentAvatar}
            destroyOnCancel={!currentAvatar}
            size="sm"
            fullWidth
            content={
              <Grid
                container
                justify="center"
                direction="column"
                alignItems="center"
              >
                <AvatarEditor
                  ref={this.setEditorRef}
                  image={currentAvatar}
                  width={240}
                  height={240}
                  border={10}
                  color={[255, 255, 255, 0.6]} // RGBA
                  borderRadius={250}
                  scale={1.2}
                  rotate={0}
                />
                <Grid>
                  <input
                    style={{ display: 'none' }}
                    accept="image/*"
                    id="avatar-file-upload"
                    type="file"
                    onChange={this.onImageChange}
                  />
                  <label htmlFor="avatar-file-upload">
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      component="span"
                      startIcon={<CloudUpload />}
                    >
                      Choose file
                    </Button>
                  </label>
                </Grid>
              </Grid>
            }
          />
        </Grid>
      </Grid>
    );
  }
}

export default UploadAvatarComponent;
