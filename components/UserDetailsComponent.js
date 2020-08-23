import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { Typography, Grid, Divider, Link, Chip } from '@material-ui/core';
import MissingInfoComponent from './MissingInfoComponent';
import { getUserById, GetUserByIdDataSelector } from '../stores/userState';
import { Done, Lock } from '@material-ui/icons';
import CardSimpleLayout from '../layouts/CardSimpleLayout';
import InfoLayout from '../layouts/InforLayout';
import AvatarComponent from './AvatarComponent';
import Moment from 'react-moment';
import { DATE_TIME_FORMAT } from '../utils';

const connectToRedux = connect(
  createStructuredSelector({
    detailsData: GetUserByIdDataSelector
  }),
  dispatch => ({
    getDetails: id => dispatch(getUserById(id))
  })
);

const UserDetailsComponent = ({ detailsData, getDetails }) => {
  useEffect(() => {
    getDetails(Router.query.id);
  }, [getDetails]);

  const rows = [
    { label: 'Full Name', key: 'fullName' },
    { label: 'Avatar', key: 'avatar' },
    { label: 'Email', key: 'email' },
    { label: 'Address', key: 'address' },
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Time Created', key: 'timeCreated' },
    { label: 'Status', key: 'status' }
  ];
  let displays = {};
  if (detailsData) {
    displays = {
      fullName: detailsData.fullName,
      avatar: <AvatarComponent small url={detailsData.avtUrl} />,
      email: detailsData.email,
      address: detailsData.address,
      phoneNumber: detailsData.phoneNumber,
      timeCreated: <Moment format={DATE_TIME_FORMAT}>{detailsData.createdTime}</Moment>,
      status: (
        <Chip
          label={detailsData.status ? 'Active' : 'Disabled'}
          clickable
          color={!detailsData.status ? 'secondary' : 'default'}
          deleteIcon={detailsData.status ? <Done /> : <Lock />}
          style={
            detailsData.status ? { background: 'green', color: 'white' } : {}
          }
        />
      )
    };
  }

  return !detailsData ? (
    <MissingInfoComponent>
      <Typography variant="h5" color="secondary">
        Not found any Biker
      </Typography>
    </MissingInfoComponent>
  ) : (
    <Grid>
      <Grid container justify="center">
        <Grid xs={12} item className="shadow-0">
          <CardSimpleLayout
            header={
              <Grid
                container
                justify="space-between"
                alignItems="center"
                direction="row"
              >
                <Typography variant="h6">Biker details</Typography>
              </Grid>
            }
            body={<InfoLayout subtitle="" rows={rows} displays={displays} />}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connectToRedux(UserDetailsComponent);
