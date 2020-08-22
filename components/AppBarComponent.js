import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import {
  compact,
  flow,
  isArray,
  join,
  map,
  split,
  upperFirst,
  pick
} from 'lodash/fp';
import clsx from 'clsx';

import HeaderUserInfoComponent from './HeaderUserInfoComponent';
import {
  makeStyles,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Breadcrumbs,
  Typography
} from '@material-ui/core';
import { MenuOpen, Refresh } from '@material-ui/icons';
import { TOGGLE_SIDEBAR } from '../stores/NavigationState';
import { compose } from 'recompose';

const formatPathName = flow(split('/'), compact, map(upperFirst), join(' / '));

const doDispatchAction = dispatch => fetchData => {
  let actionCreators = fetchData;
  if (typeof fetchData === 'function') {
    actionCreators = [fetchData];
  }

  if (isArray(actionCreators)) {
    actionCreators.forEach(actionCreator => dispatch(actionCreator({})));
  }
};

const connectToRedux = connect(pick(['showSidebar']), dispatch => ({
  sidebarToggle: value =>
    dispatch({
      type: TOGGLE_SIDEBAR,
      payload: value
    }),
  refreshData: doDispatchAction(dispatch)
}));

const enhance = compose(connectToRedux, withRouter);

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: theme.spacing(3) // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center'
  },
  menuButton: {
    color: 'white',
    margin: `0px ${theme.spacing(1)}px 0px 0px`
  },
  buttonRotate: {
    transform: 'rotate(180deg)'
  },
  breadCrumbsSection: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  breadCrumbs: {
    color: 'white'
  },
  refreshButton: {
    color: 'white'
  }
}));

const AppBarComponent = ({
  empty,
  showSidebar,
  sidebarToggle,
  refreshData,
  fetchData,
  router,
  title
}) => {
  const classes = useStyles();
  return (
    <AppBar
      color="primary"
      position="relative"
      className={clsx(classes.appBar, classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        {!empty && (
          <Fragment>
            <Grid container alignItems="center" className={classes.root}>
              {!showSidebar && (
                <IconButton
                  className={classes.menuButton}
                  onClick={() => sidebarToggle(true)}
                >
                  <MenuOpen className={classes.buttonRotate} />
                </IconButton>
              )}

              <Grid className={classes.breadCrumbsSection}>
                <Breadcrumbs aria-label="breadcrumb">
                  <Typography className={classes.breadCrumbs}>
                    {formatPathName(router.pathname)}
                  </Typography>
                </Breadcrumbs>
                <Typography className={classes.subTitle} variant="body2">
                  {title}
                </Typography>
              </Grid>
            </Grid>
            <Grid className={classes.rightSection}>
              {fetchData && (
                <IconButton
                  className={classes.refreshButton}
                  onClick={() => refreshData(fetchData)}
                >
                  <Refresh />
                </IconButton>
              )}
              <HeaderUserInfoComponent />
            </Grid>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default enhance(AppBarComponent);
