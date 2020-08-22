import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
const getSizeNameBySize = ({ small, medium, large }) => {
  switch (true) {
    case small:
      return 'small';
    case medium:
      return 'medium';
    case large:
      return 'large';
    default:
      return 'medium';
  }
};

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  medium: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6)
  }
}));
const AvatarComponent = ({
  url = '/static/images/avatar-default.png',
  small,
  medium,
  large,
  alt,
  className,
  ...others
}) => {
  const sizeName = getSizeNameBySize({ small, medium, large });
  const classes = useStyles();
  return (
    <Avatar
      alt={alt}
      src={url}
      className={clsx(classes[sizeName], className)}
      {...others}
    />
  );
};
export default AvatarComponent;
