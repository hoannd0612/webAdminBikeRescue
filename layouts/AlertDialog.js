import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  Slide,
  makeStyles,
  IconButton
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyle = makeStyles((theme) => ({
  dialogAction: {
    justifyContent: 'center'
  },
  buttonFooter: {
    minWidth: '40%'
  },
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

const DialogTitle = (props) => {
  const { children, classes, onClose, disableTypography, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography={disableTypography}
      className={classes.root}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const AlertDialog = ({
  size = false,
  fullWidth = false,
  isOpenDialog,
  setIsOpenDialog,
  onOk,
  onCancel,
  okText = 'OK',
  cancelText = 'Cancel',
  title = '',
  content = '',
  titleStyle = {},
  contentStyle = {},
  isFooter = true,
  disableTypographyTitle = false,
  background,
  destroyOnOk,
  destroyOnCancel,
  onClose
}) => {
  const classes = useStyle();

  const handleClose = () => setIsOpenDialog(false);

  return (
    <div>
      <Dialog
        open={isOpenDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setIsOpenDialog(false)}
        maxWidth={size}
        fullWidth={fullWidth}
        PaperProps={{
          style: {
            backgroundColor: background
          }
        }}
      >
        {(title || onClose) && (
          <DialogTitle
            disableTypography={disableTypographyTitle}
            style={titleStyle}
            onClose={onClose}
            classes={classes}
          >
            {title}
          </DialogTitle>
        )}
        <DialogContent style={contentStyle}>{content}</DialogContent>
        {isFooter && !(destroyOnCancel && destroyOnOk) && (
          <DialogActions
            classes={{
              root: classes.dialogAction
            }}
          >
            {!destroyOnCancel && (
              <Button
                onClick={onCancel ? onCancel : handleClose}
                className={classes.buttonFooter}
                color="primary"
              >
                {cancelText}
              </Button>
            )}
            {!destroyOnOk && (
              <Button
                onClick={onOk}
                className={classes.buttonFooter}
                color="primary"
                variant="contained"
              >
                {okText}
              </Button>
            )}
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default AlertDialog;
