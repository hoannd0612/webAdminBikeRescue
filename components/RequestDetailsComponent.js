import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { upperCase, get } from 'lodash/fp';
import { Typography, Grid, Divider, Link, Chip } from '@material-ui/core';
import MissingInfoComponent from './MissingInfoComponent';
import RatingComponent from './commons/RatingComponent';
import ShortenContentComponent from './commons/ShortenContentComponent';
import {
  getRequestById,
  GetRequestByIdDataSelector
} from '../stores/RequestState';
import { Done, Lock } from '@material-ui/icons';
import CardSimpleLayout from '../layouts/CardSimpleLayout';
import Button from '../layouts/Button';
import InfoLayout from '../layouts/InforLayout';
import ReactTableLayout from '../layouts/SimpleTableLayout';
import DisplayShortenComponent from './commons/DisplayShotenComponent';
import { createLink } from '../libs';
import Moment from 'react-moment';
import RequestStatusComponent from './RequestStatusComponent';
import { DATE_TIME_FORMAT } from '../utils';

const connectToRedux = connect(
  createStructuredSelector({
    detailsData: GetRequestByIdDataSelector
  }),
  dispatch => ({
    getDetails: id => dispatch(getRequestById(id))
  })
);

const REQUEST_SHOP_SERVICES_COLUMN = [
  { field: 'serviceName', title: 'Service Name' },
  { field: 'unit', title: 'Service Unit' },
  { field: 'category', title: 'Category' },
  { field: 'price', title: 'Price' }
];

const getData = ({ detailsData = {} }) => {
  return (
    !!detailsData &&
    !!detailsData.listReqShopService &&
    detailsData.listReqShopService.map((service = {}) => {
      return {
        serviceName: get('shopService.services.serviceName')(service),
        serviceDescription: (
          <DisplayShortenComponent>
            {get('shopService.services.description')(service)}
          </DisplayShortenComponent>
        ),
        shopServiceDescription: (
          <DisplayShortenComponent>
            {get('shopService.description')(service)}
          </DisplayShortenComponent>
        ),
        category: get('shopService.services.category.categoryName')(service),
        price: (get('shopService.price')(service) || 0).toLocaleString(
          'it-IT',
          {
            style: 'currency',
            currency: 'VND'
          }
        ),
        unit: get('shopService.services.unit')(service)
      };
    })
  );
};
const RequestDetailsComponent = ({ detailsData, getDetails }) => {
  useEffect(() => {
    getDetails(Router.query.id);
  }, [getDetails]);

  const rows = [
    { key: 'code', label: 'Request Code' },
    { key: 'userCreated', label: 'Biker' },
    { key: 'createdAt', label: 'Time Created' },
    { key: 'userAccepted', label: 'Shop Owner' },
    { key: 'acceptedAt', label: 'Time Accepted' },
    { key: 'vehicle', label: 'Vehicle' },
    // { key: 'latitude', label: 'Latitude' },
    { key: 'reviewComment', label: 'Review Comment' },
    { key: 'reviewRating', label: 'Review Rating' },
    { key: 'price', label: 'Price' },
    { key: 'address', label: 'Address' },
    { key: 'cancelReason', label: 'Cancel Reason' },
    { key: 'status', label: 'Request Status' }
  ];
  let displays = {};
  if (detailsData) {
    console.log({ detailsData });
    displays = {
      code: <a>{detailsData.code}</a>,
      userCreated: (detailsData.created || {}).fullName,
      createdAt: (
        <Moment format={DATE_TIME_FORMAT}>{detailsData.createdDate}</Moment>
      ),
      userAccepted: (
        <Link
          href={createLink([
            'shop-owner',
            `details?id=${(detailsData.accepted || {}).id}`
          ])}
        >
          <a>{(detailsData.accepted || {}).fullName}</a>
        </Link>
      ),
      acceptedAt: (detailsData.accepted || {}).createdTime,
      longtitude: detailsData.longtitude,
      latitude: detailsData.latitude,
      price: detailsData.price.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND'
      }),
      vehicle: detailsData.vehicle.brand,
      reviewComment: detailsData.reviewComment,
      reviewRating: <RatingComponent star={detailsData.reviewRating} />,
      cancelReason: detailsData.cancelReason,
      address: detailsData.address,
      description: (
        <DisplayShortenComponent>
          {detailsData.description}
        </DisplayShortenComponent>
      ),
      cancelReason: detailsData.cancelReason,
      status: <RequestStatusComponent status={detailsData.status} />
    };
  }

  return !detailsData ? (
    <MissingInfoComponent>
      <Typography variant="h5" color="secondary">
        Not found any Request
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
                <Typography variant="h6">Request details</Typography>
              </Grid>
            }
            body={<InfoLayout subtitle="" rows={rows} displays={displays} />}
          />
        </Grid>
      </Grid>
      <Grid style={{ marginTop: 40 }} container justify="center">
        <Grid xs={12} item className="shadow-0">
          <CardSimpleLayout
            bodyStyle={{ padding: 0 }}
            header={<Typography variant="h6">List Service</Typography>}
            body={
              <ReactTableLayout
                hasPaging={false}
                data={getData({
                  detailsData: detailsData || {}
                })}
                columns={REQUEST_SHOP_SERVICES_COLUMN}
              />
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connectToRedux(RequestDetailsComponent);
