import React, { useEffect } from 'react';
import {
  List,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItem,
  makeStyles,
  createStyles
} from '@material-ui/core';
import {
  ExpandMore as IconExpandMore,
  ExpandLess as IconExpandLess
} from '@material-ui/icons';
import RLink from '../layouts/RLink';
import { useRouter } from 'next/router';
import cx from 'classnames';
import { createLink } from '../libs';

const MenuItem = props => {
  const { className, onClick, children, link } = props;

  if (!link || typeof link !== 'string') {
    return (
      <ListItem
        button
        className={className}
        children={children}
        onClick={onClick}
      />
    );
  }
  return (
    <RLink href={link || '/'}>
      <ListItem button className={className} children={children} to={link} />
    </RLink>
  );
};

const AppBarItemComponent = ({
  label,
  link,
  onClick,
  icon,
  subPaths = [],
  isChild = false,
  parentPath,
  name
}) => {
  const router = useRouter();
  const classes = useStyles();
  const isExpandable = subPaths && subPaths.length > 0;
  const [open, setOpen] = React.useState(false);
  let finalLink = link;
  if (!onClick && link === '') {
    finalLink = '/';
  }

  function handleClick() {
    setOpen(!open);
  }

  useEffect(() => {
    if (parentPath === name) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [parentPath, name]);

  const MenuItemRoot = (
    <MenuItem
      className={cx(classes.menuItem, classes.aTag)}
      link={finalLink}
      onClick={() => {
        handleClick();
        if (typeof onClick === 'function') {
          onClick();
        }
      }}
    >
      {!!icon && (
        <ListItemIcon className={classes.menuItemIcon}>{icon}</ListItemIcon>
      )}
      <ListItemText
        disableTypography
        className={cx(
          !isChild ? classes.menuItemLabel : classes.subMenuItemLabel,
          router.pathname === finalLink && classes.menuItemActive
        )}
        primary={label}
        inset={!icon}
      />
      {isExpandable && !open && <IconExpandMore />}
      {isExpandable && open && <IconExpandLess />}
    </MenuItem>
  );

  const MenuItemChildren = isExpandable ? (
    <Collapse
      in={router.pathname === finalLink || open}
      timeout="auto"
      unmountOnExit
    >
      <List component="div" disablePadding>
        {subPaths.map((item, index) => (
          <AppBarItemComponent
            {...item}
            key={index}
            isChild
            link={createLink([name, item.name])}
            onClick={item.onClick}
          />
        ))}
      </List>
    </Collapse>
  ) : null;

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  );
};

const useStyles = makeStyles(theme =>
  createStyles({
    aTag: {
      color: '#546e7a'
    },
    menuItem: {
      borderRadius: 5
    },
    menuItemActive: {
      color: '#5850EC'
    },
    menuItemIcon: {
      paddingRight: theme.spacing(2),
      minWidth: 'unset'
    },
    menuItemLabel: {
      fontWeight: 600
    },
    subMenuItemLabel: {
      paddingLeft: theme.spacing(5)
    }
  })
);

export default AppBarItemComponent;
