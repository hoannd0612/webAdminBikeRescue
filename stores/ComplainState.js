import { makeFetchAction } from 'redux-api-call';
import { get, flow } from 'lodash/fp';

import { respondToSuccess } from './middlewares/api-reaction';
import { createErrorSelector } from '../utils';
import nfetch from '../libs/nfetch';
import { getResetter } from '../libs';
import moment from 'moment';

const GET_COMPLAIN = 'GET_COMPLAIN';
const GET_COMPLAIN_BY_ID = 'GET_COMPLAIN_BY_ID';
export const UPDATE_COMPLAIN_STATUS = 'UPDATE_COMPLAIN_STATUS';

//Get Complain paging
export const GetComplainsAPI = makeFetchAction(
  GET_COMPLAIN,
  ({ page, size, status }) => {
    return nfetch({
      endpoint: `/complain/paging?status=${status}&page=${page}&size=${size}`,
      method: 'GET'
    })();
  }
);
export const getComplains = ({ page, size, status }) =>
  respondToSuccess(
    GetComplainsAPI.actionCreator({ page, size, status }),
    () => {}
  );
export const GetComplainsDataSelector = GetComplainsAPI.dataSelector;

// Get Complain by id
export const GetComplainByIdAPI = makeFetchAction(
  GET_COMPLAIN_BY_ID,
  ({ id }) =>
    nfetch({
      endpoint: `/complain/${id}`,
      method: 'GET'
    })()
);
export const getComplainById = id =>
  respondToSuccess(GetComplainByIdAPI.actionCreator({ id }), () => {});
export const GetComplainByIdDataSelector = GetComplainByIdAPI.dataSelector;
export const GetComplainByIdResetter = getResetter(GetComplainByIdAPI);

// Get Complain by id
export const UpdateComplainAPI = makeFetchAction(
  UPDATE_COMPLAIN_STATUS,
  ({ id }) =>
    nfetch({
      endpoint: `/complain/${id}`,
      method: 'DELETE'
    })()
);
export const updateComplain = id =>
  respondToSuccess(
    UpdateComplainAPI.actionCreator({ id }),
    (resp, _, store) => {
      store.dispatch(
        getComplains({
          page: 0,
          size: 10,
          status: localStorage.getItem('_complain_status')
        })
      );
    }
  );
export const UpdateComplainDataSelector = UpdateComplainAPI.dataSelector;
export const UpdateComplainResetter = getResetter(UpdateComplainAPI);
