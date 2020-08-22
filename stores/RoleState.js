import { makeFetchAction } from 'redux-api-call';
import { get, flow } from 'lodash/fp';

import { respondToSuccess } from '../stores/middlewares/api-reaction';
import { createErrorSelector } from '../utils';
import nfetch from '../libs/nfetch';
import { getResetter } from '../libs';

const GET_ROLE = 'GET_ROLE';
export const ADD_NEW_ROLE = 'ADD_NEW_ROLE';

//Get role paging
export const GetRolesAPI = makeFetchAction(GET_ROLE, ({ page, size }) =>
  nfetch({
    endpoint: `/admin/roles/page?page=${page}&size=${size}`,
    method: 'GET'
  })()
);
export const getRoles = ({ page, size }) =>
  respondToSuccess(GetRolesAPI.actionCreator({ page, size }), () => {});
export const GetRolesDataSelector = GetRolesAPI.dataSelector;

// Add new role
export const AddNewRoleAPI = makeFetchAction(ADD_NEW_ROLE, name =>
  nfetch({
    endpoint: '/admin/roles/create'
  })({ name })
);
export const addNewRole = name =>
  respondToSuccess(AddNewRoleAPI.actionCreator(name), (resp, _, store) => {
    store.dispatch(getRoles({ page: 0, size: 10 }));
  });
export const AddNewRoleDataSelector = AddNewRoleAPI.dataSelector;
export const AddNewRoleErrorSelector = AddNewRoleAPI.errorSelector;
export const AddNewRoleResetter = getResetter(AddNewRoleAPI);
