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
  GetServicesByShopIdDataSelector,
  GetShopOwnerByIdDataSelector,
  getShopOwnerById,
  GetShopsDataSelector,
  getShops,
  GetShopByShopOwnerIdDataSelector,
  getShopByShopOwnerId
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
    branchesData: GetShopByShopOwnerIdDataSelector,
    detailsData: GetShopOwnerByIdDataSelector
  }),
  dispatch => ({
    getDetails: id => dispatch(getShopOwnerById(id)),
    getShops: (page, pageSize, id) =>
      dispatch(getShopByShopOwnerId({ page, pageSize, id }))
  })
);

const COLUMNS = [
  {
    field: 'avatar',
    title: 'Avatar'
  },
  {
    field: 'shopName',
    title: 'Name'
  },
  {
    field: 'phoneNumber',
    title: 'Phone'
  },
  {
    field: 'numOfStart',
    title: 'Rating'
  },
  {
    field: 'email',
    title: 'Email'
  },
  {
    field: 'status',
    title: 'Shop Status'
  }
];
const getBranchData = ({ branchesData = [] }) =>
  branchesData &&
  branchesData.map(
    ({ avatarUrl, shopName, status, id, numOfStar, email, phoneNumber }) => ({
      avatar: <AvatarComponent small url={avatarUrl} />,
      shopName: (
        <Link href={createLink(['shop-owner', 'shop', `details?id=${id}`])}>
          <a>{shopName}</a>
        </Link>
      ),
      phoneNumber: phoneNumber,
      numOfStart: <RatingComponent star={numOfStar} />,
      email: email,
      status: (
        <Chip
          label={status ? 'Active' : 'Disabled'}
          clickable
          color={!status ? 'secondary' : 'default'}
          deleteIcon={status ? <Done /> : <Lock />}
          style={status ? { background: 'green', color: 'white' } : {}}
        />
      )
    })
  );

const ShopDetailsComponent = ({
  detailsData,
  getDetails,
  getShops,
  branchesData
}) => {
  useEffect(() => {
    getDetails(Router.query.id);
  }, [getDetails]);

  const rows = [
    { label: 'Avatar', key: 'avatar' },
    { label: 'Full Name', key: 'fullName' },
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Email', key: 'email' },
    { label: 'Address', key: 'address' },
    { label: 'Status', key: 'status' }
  ];
  let displays = {};
  if (detailsData) {
    displays = {
      avatar: <AvatarComponent small url={detailsData.avtUrl} />,
      fullName: detailsData.fullName,
      phoneNumber: detailsData.phoneNumber,
      email: detailsData.email || <small>N/A</small>,
      address: detailsData.address || <small>N/A</small>,
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

  let totalCount = 0,
    page = 0,
    pageSize = 10;
  if (branchesData) {
    totalCount = branchesData.totalElements;
  }

  return !detailsData ? (
    <MissingInfoComponent>
      <Typography variant="h5" color="secondary">
        Not found any Shop
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
                <Typography variant="h6">Shop Owner details</Typography>
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
            header={<Typography variant="h6">Branches</Typography>}
            body={
              <ReactTableLayout
                dispatchExCondition={[Router.query.id]}
                dispatchAction={getShops}
                data={getBranchData({
                  branchesData: (branchesData || {}).content || []
                })}
                columns={COLUMNS}
                totalCount={totalCount}
                page={page}
                pageSize={pageSize}
              />
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connectToRedux(ShopDetailsComponent);
