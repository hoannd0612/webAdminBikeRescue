import ReactTableLayout from '../layouts/SimpleTableLayout';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FrameHeaderComponent from './FrameHeaderComponent';
import {
  getReviewComments,
  GetReviewCommentsDataSelector
} from '../stores/RequestState';
import RatingComponent from './commons/RatingComponent';
import Link from 'next/link';
import { createLink } from '../libs';
import Moment from 'react-moment';
import { DATE_TIME_FORMAT } from '../utils';

const connectWithRedux = connect(
  createStructuredSelector({
    requestsData: GetReviewCommentsDataSelector
  }),
  dispatch => ({
    getRequests: (page, size) => dispatch(getReviewComments({ page, size }))
  })
);
const COLUMNS = [
  {
    field: 'code',
    title: 'Code'
  },

  {
    field: 'reviewComment',
    title: 'Comment'
  },
  {
    field: 'reviewRating',
    title: 'Rating'
  },
  {
    field: 'reviewUpdateDate',
    title: 'Time'
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
    reviewComment: request.reviewComment,
    reviewUpdateDate: request.reviewUpdateDate && (
      <Moment format={DATE_TIME_FORMAT}>{request.reviewUpdateDate}</Moment>
    ),
    reviewRating: <RatingComponent star={request.reviewRating} />
  }));

const ReviewCommentComponent = ({ requestsData, getRequests }) => {
  let totalCount = 0,
    page = 0,
    pageSize = 10;
  if (requestsData) {
    totalCount = requestsData.totalElements;
  }

  return (
    <React.Fragment>
      <FrameHeaderComponent title="Feedback management"></FrameHeaderComponent>
      <ReactTableLayout
        dispatchAction={getRequests}
        data={getData({
          requestsData: (requestsData || {}).content || []
        })}
        columns={COLUMNS}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
      />
    </React.Fragment>
  );
};

export default connectWithRedux(ReviewCommentComponent);
