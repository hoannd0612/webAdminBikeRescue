import ButtonActionTableComponent from './commons/ButtonActionTableComponent';
import ReactTableLayout from '../layouts/SimpleTableLayout';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Lock, LockOpen, Done, Edit } from '@material-ui/icons';
import { Chip, Grid } from '@material-ui/core';
import { reset } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import FrameHeaderComponent from './FrameHeaderComponent';
import Button from '../layouts/Button';
import AlertDialog from '../layouts/AlertDialog';
import { GetRequestsDataSelector, getRequests } from '../stores/RequestState';
// import RequestAddingComponent from './RequestAddingComponent';
import ServiceActionComponent from './ServiceActionComponent';
import ShortenContentComponent from './commons/ShortenContentComponent';
import RatingComponent from './commons/RatingComponent';
import Link from 'next/link';
import { createLink } from '../libs';
import AvatarComponent from './AvatarComponent';
import RLink from '../layouts/RLink';
import RequestStatusComponent from './RequestStatusComponent';
import Moment from 'react-moment';
import { DATE_TIME_FORMAT, DEFAULT_DATE_RANGE } from '../utils';
import { get } from 'lodash/fp';

const connectWithRedux = connect(
  createStructuredSelector({
    requestsData: GetRequestsDataSelector
  }),
  dispatch => ({
    getRequests: (page, size, dateRange) => {
      console.log({ dateRange });
      dispatch(getRequests({ page, size, dateRange }));
    },
    resetAddRequestForm: () => dispatch(reset('addNewRequest'))
  })
);
const COLUMNS = [
  {
    field: 'code',
    title: 'Code'
  },
  {
    field: 'userCreated',
    title: 'Biker'
  },
  {
    field: 'createdAt',
    title: 'Time Created'
  },
  {
    field: 'userAccepted',
    title: 'Shop Name'
  },
  // {
  //   field: 'acceptedAt',
  //   title: 'Time Accepted'
  // },
  {
    field: 'status',
    title: 'Status'
  }
];

const getData = ({ requestsData = [] }) =>
  requestsData &&
  requestsData.map((request = {}) => ({
    code: (
      <Link href={createLink(['request', `details?id=${request.id}`])}>
        <a>{request.code}</a>
      </Link>
    ),
    userCreated: (request.created || {}).fullName,
    createdAt: <Moment format={DATE_TIME_FORMAT}>{request.createdDate}</Moment>,
    userAccepted: (
      <Link
        href={createLink([
          'shop-owner',
          'shop',
          `details?id=${get('listReqShopService[0].shopService.shops.id')(
            request
          )}`
        ])}
      >
        <a>
          {get('listReqShopService[0].shopService.shops.shopName')(request)}
        </a>
      </Link>
    ),
    acceptedAt: (
      <Moment format={DATE_TIME_FORMAT}>
        {(request.accepted || {}).createdTime}
      </Moment>
    ),
    longtitude: request.longtitude,
    latitude: request.latitude,
    price:
      request.price &&
      request.price.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND'
      }),
    address: <ShortenContentComponent content={request.address} />,
    status: <RequestStatusComponent status={request.status} />
  }));

const RequestManagementComponent = ({
  requestsData,
  getRequests,
  addRequestSuccessMessage,
  resetData,
  resetAddRequestForm,
  updateRequestData
}) => {
  const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);
  useEffect(() => {
    if (addRequestSuccessMessage) {
      setIsOpenAdd(false);
      resetData();
      resetAddRequestForm();
    }
  }, [addRequestSuccessMessage]);

  useEffect(() => {
    if (updateRequestData) {
      setIsOpenUpdate(false);
      resetData();
    }
  }, [updateRequestData]);

  let totalCount = 0,
    page = 0,
    pageSize = 10;
  if (requestsData) {
    totalCount = requestsData.totalElements;
  }

  return (
    <React.Fragment>
      <FrameHeaderComponent title="Request management"></FrameHeaderComponent>
      <ReactTableLayout
        dispatchAction={getRequests}
        data={getData({
          requestsData: (requestsData || {}).content || []
        })}
        columns={COLUMNS}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
        hasAction={true}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
    </React.Fragment>
  );
};

export default connectWithRedux(RequestManagementComponent);
