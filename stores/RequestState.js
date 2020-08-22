import { makeFetchAction } from 'redux-api-call';
import { get, flow } from 'lodash/fp';

import { respondToSuccess } from '../stores/middlewares/api-reaction';
import { createErrorSelector } from '../utils';
import nfetch from '../libs/nfetch';
import { getResetter } from '../libs';

const GET_REQUEST = 'GET_REQUEST';
export const ADD_NEW_REQUEST = 'ADD_NEW_REQUEST';
const GET_REQUEST_BY_ID = 'GET_REQUEST_BY_ID';
const GET_REVIEW_COMMENT = 'GET_REVIEW_COMMENT';

//Get role paging
export const GetRequestsAPI = makeFetchAction(GET_REQUEST, ({ page, size }) =>
  nfetch({
    endpoint: `/biker/getAllRequestPaging?page=${page}&size=${size}`,
    method: 'GET'
  })()
);
export const getRequests = ({ page, size }) =>
  respondToSuccess(GetRequestsAPI.actionCreator({ page, size }), () => {});
export const GetRequestsDataSelector = GetRequestsAPI.dataSelector;

//Get review comment
export const GetReviewCommentsAPI = makeFetchAction(
  GET_REVIEW_COMMENT,
  ({ page, size }) =>
    nfetch({
      endpoint: `/biker/getAllFeedBack?page=${page}&size=${size}`,
      method: 'GET'
    })()
);
export const getReviewComments = ({ page, size }) =>
  respondToSuccess(
    GetReviewCommentsAPI.actionCreator({ page, size }),
    () => {}
  );
export const GetReviewCommentsDataSelector = GetReviewCommentsAPI.dataSelector;

// Get Request by id
export const GetRequestByIdAPI = makeFetchAction(GET_REQUEST_BY_ID, ({ id }) =>
  nfetch({
    endpoint: `/biker/request/${id}`,
    method: 'GET'
  })()
);
export const getRequestById = id =>
  respondToSuccess(GetRequestByIdAPI.actionCreator({ id }), () => {});
export const GetRequestByIdDataSelector = GetRequestByIdAPI.dataSelector;
export const GetRequestByIdResetter = getResetter(GetRequestByIdAPI);
