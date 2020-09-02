import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { upperCase, get } from 'lodash/fp';
import {
  Typography,
  Grid,
  Divider,
  Link,
  Chip,
  Avatar
} from '@material-ui/core';
import MissingInfoComponent from './MissingInfoComponent';
import RatingComponent from './commons/RatingComponent';
import ShortenContentComponent from './commons/ShortenContentComponent';
import {
  getComplainById,
  GetComplainByIdDataSelector
} from '../stores/ComplainState';
import { Done, Lock } from '@material-ui/icons';
import CardSimpleLayout from '../layouts/CardSimpleLayout';
import Button from '../layouts/Button';
import InfoLayout from '../layouts/InforLayout';
import ReactTableLayout from '../layouts/SimpleTableLayout';
import AvatarComponent from './AvatarComponent';
import { createLink } from '../libs';
import Moment from 'react-moment';
import { DATE_TIME_FORMAT } from '../utils';

const connectToRedux = connect(
  createStructuredSelector({
    detailsData: GetComplainByIdDataSelector
  }),
  dispatch => ({
    getDetails: id => dispatch(getComplainById(id))
  })
);

const ComplainDetailsComponent = ({ detailsData, getDetails }) => {
  useEffect(() => {
    getDetails(Router.query.id);
  }, [getDetails]);

  const rows = [
    { label: 'Image', key: 'image' },
    { label: 'Request code', key: 'requestCode' },
    { label: 'Complainer', key: 'complainer' },
    { label: 'Complain Reason', key: 'complainReason' },
    { label: 'Created Date', key: 'createdDate' },
    { label: 'Finished Date', key: 'finishedDate' },
    // { label: 'Open Time', key: 'openTime' },
    // { label: 'Close Time', key: 'closeTime' },
    // { label: 'Description', key: 'description' },
    { label: 'Status', key: 'status' }
  ];
  let displays = {};
  if (detailsData) {
    displays = {
      image: <AvatarComponent small url={detailsData.image} />,
      complainReason: detailsData.complainReason,
      createdDate: detailsData.createdDate && (
        <Moment format={DATE_TIME_FORMAT}>{detailsData.createdDate}</Moment>
      ),
      finishedDate: detailsData.finishedDate && (
        <Moment format={DATE_TIME_FORMAT}>{detailsData.finishedDate}</Moment>
      ),
      complainer: (
        <Link
          href={createLink([
            'biker',
            `details?id=${get('created.id')(detailsData)}`
          ])}
        >
          {get('created.fullName')(detailsData)}
        </Link>
      ),
      requestCode: (
        <Link
          href={createLink([
            'request',
            `details?id=${get('request.id')(detailsData)}`
          ])}
        >
          {get('request.code')(detailsData)}
        </Link>
      ),
      status: (
        <Chip
          label={detailsData.status ? 'Xử lý thành công' : 'Đang xử lý'}
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
        Not found any Complain
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
                <Typography variant="h6">Complain details</Typography>
              </Grid>
            }
            body={<InfoLayout subtitle="" rows={rows} displays={displays} />}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connectToRedux(ComplainDetailsComponent);
