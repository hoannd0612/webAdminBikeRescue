import { makeFetchAction } from 'redux-api-call';
import { get, flow } from 'lodash/fp';

import { respondToSuccess } from '../stores/middlewares/api-reaction';
import { createErrorSelector } from '../utils';
import nfetch from '../libs/nfetch';
import { getResetter } from '../libs';

const GET_CONFIG = 'GET_CONFIG';
export const ADD_NEW_CONFIG = 'ADD_NEW_CONFIG';
export const DELETE_CONFIG = 'DELETE_CONFIG';
export const UPDATE_CONFIG = 'UPDATE_CONFIG';
export const GET_CONFIG_BY_ID = 'GET_CONFIG_BY_ID';

//Get config
export const GetConfigsAPI = makeFetchAction(GET_CONFIG, ({ page, pageSize }) =>
  nfetch({
    endpoint: `/getAllConfigPaging?page=${page}&size=${pageSize}`,
    method: 'GET'
  })()
);
export const getConfigs = ({ page, pageSize }) =>
  respondToSuccess(GetConfigsAPI.actionCreator({ page, pageSize }), () => {});
export const GetConfigsDataSelector = GetConfigsAPI.dataSelector;

// Add new Config
export const AddNewConfigAPI = makeFetchAction(ADD_NEW_CONFIG, values =>
  nfetch({
    endpoint: '/configuaration'
  })(values)
);
export const addNewConfig = values =>
  respondToSuccess(AddNewConfigAPI.actionCreator(values), (resp, _, store) => {
    store.dispatch(getConfigs({ page: 0, pageSize: 10 }));
  });
export const AddNewConfigDataSelector = AddNewConfigAPI.dataSelector;
export const AddNewConfigErrorSelector = AddNewConfigAPI.errorSelector;
export const AddNewConfigResetter = getResetter(AddNewConfigAPI);

// Delete Config
export const DeleteConfigAPI = makeFetchAction(DELETE_CONFIG, ({ id }) =>
  nfetch({
    endpoint: `/config/${id}`,
    method: 'DELETE'
  })()
);
export const deleteConfig = id =>
  respondToSuccess(DeleteConfigAPI.actionCreator({ id }), (resp, _, store) => {
    store.dispatch(getConfigs({ page: 0, pageSize: 10 }));
  });
export const DeleteConfigDataSelector = DeleteConfigAPI.dataSelector;
export const DeleteConfigResetter = getResetter(DeleteConfigAPI);

// Update Config
export const UpdateConfigAPI = makeFetchAction(UPDATE_CONFIG, values =>
  nfetch({
    endpoint: `/config/${values.id}`,
    method: 'PUT'
  })(values)
);
export const updateConfig = values =>
  respondToSuccess(UpdateConfigAPI.actionCreator(values), (resp, _, store) => {
    store.dispatch(getConfigs({ page: 0, pageSize: 10 }));
  });
export const UpdateConfigDataSelector = UpdateConfigAPI.dataSelector;
export const UpdateConfigResetter = getResetter(UpdateConfigAPI);

// Get Config by id
export const GetConfigByIdAPI = makeFetchAction(GET_CONFIG_BY_ID, ({ id }) =>
  nfetch({
    endpoint: `/config/getBy/${id}`,
    method: 'GET'
  })()
);
export const getConfigById = id =>
  respondToSuccess(GetConfigByIdAPI.actionCreator({ id }), () => {});
export const GetConfigByIdDataSelector = GetConfigByIdAPI.dataSelector;
export const GetConfigByIdResetter = getResetter(GetConfigByIdAPI);
