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
  getShopById,
  GetShopByIdDataSelector,
  getServicesByShopId,
  GetServicesByShopIdDataSelector
} from '../stores/ShopState';
import { Done, Lock } from '@material-ui/icons';
import CardSimpleLayout from '../layouts/CardSimpleLayout';
import Button from '../layouts/Button';
import InfoLayout from '../layouts/InforLayout';
import ReactTableLayout from '../layouts/SimpleTableLayout';
import AvatarComponent from './AvatarComponent';
import { createLink } from '../libs';

const connectToRedux = connect(
  createStructuredSelector({
    detailsData: GetShopByIdDataSelector,
    servicesData: GetServicesByShopIdDataSelector
  }),
  dispatch => ({
    getDetails: id => dispatch(getShopById(id)),
    getServicesByShopId: shopId => dispatch(getServicesByShopId({ shopId }))
  })
);

const COLUMNS = [
  {
    field: 'serviceName',
    title: 'Service Name'
  },
  {
    field: 'price',
    title: 'Price'
  },
  {
    field: 'unit',
    title: 'Unit'
  }
];

const getData = ({ servicesData = [] }) => {
  return (
    servicesData &&
    servicesData.map(shopService => {
      const services = shopService.services || {};
      return {
        serviceName: services.serviceName,
        description: shopService.description,
        unit: services.unit,
        price:
          shopService.price &&
          shopService.price.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND'
          })
      };
    })
  );
};

const ShopDetailsComponent = ({
  detailsData,
  getDetails,
  servicesData,
  getServicesByShopId
}) => {
  useEffect(() => {
    getDetails(Router.query.id);
  }, [getDetails]);

  useEffect(() => {
    getServicesByShopId(Router.query.id);
  }, [getServicesByShopId]);

  const rows = [
    { label: 'Avatar', key: 'avatar' },
    { label: 'Branch Name', key: 'shopName' },
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Rating Star', key: 'rating' },
    { label: 'Email', key: 'email' },
    { label: 'Address', key: 'address' },
    { label: 'Open Time', key: 'openTime' },
    { label: 'Close Time', key: 'closeTime' },
    { label: 'Description', key: 'description' },
    { label: 'Status', key: 'status' }
  ];
  let displays = {};
  if (detailsData) {
    displays = {
      avatar: <AvatarComponent small url={detailsData.avtUrl} />,
      shopName: detailsData.shopName,
      phoneNumber: detailsData.phoneNumber,
      longtitude: detailsData.longtitude || <small>not yet defined</small>,
      latitude: detailsData.latitude || <small>not yet defined</small>,
      rating: <RatingComponent star={detailsData.numOfStar} /> || (
        <small>not yet defined</small>
      ),
      email: detailsData.email || <small>not yet defined</small>,
      address: detailsData.address || <small>not yet defined</small>,
      description: detailsData.description || <small>not yet defined</small>,
      openTime: detailsData.openTime ? (
        detailsData.openTime
      ) : (
        <small>not yet defined</small>
      ),
      closeTime: detailsData.closeTime ? (
        detailsData.closeTime
      ) : (
        <small>not yet defined</small>
      ),
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
        Not found any Branch
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
                <Typography variant="h6">Shop details</Typography>
                {detailsData && detailsData.userInfoDTO.fullName && (
                  <div>
                    Owner:{' '}
                    <Link
                      href={createLink([
                        'shop-owner',
                        `details?id=${detailsData.userInfoDTO.id}`
                      ])}
                    >
                      <a>{detailsData.userInfoDTO.fullName}</a>
                    </Link>
                  </div>
                )}
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
            header={<Typography variant="h6">Shop Services</Typography>}
            body={
              <ReactTableLayout
                dispatchAction={() => getServicesByShopId(Router.query.id)}
                hasPaging={false}
                data={getData({
                  servicesData: servicesData || []
                })}
                columns={COLUMNS}
              />
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connectToRedux(ShopDetailsComponent);
