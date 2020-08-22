import { makeFetchAction } from 'redux-api-call';
import { get, flow } from 'lodash/fp';

import { respondToSuccess } from '../stores/middlewares/api-reaction';
import { createErrorSelector } from '../utils';
import nfetch from '../libs/nfetch';
import { getResetter } from '../libs';

const GET_CATEGORY = 'GET_CATEGORY';
export const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const GET_CATEGORY_BY_ID = 'GET_CATEGORY_BY_ID';

// Service
const GET_SERVICE = 'GET_SERVICE';
export const ADD_NEW_SERVICE = 'ADD_NEW_SERVICE';
export const UPDATE_SERVICE = 'UPDATE_SERVICE';
export const GET_SERVICE_BY_ID = 'GET_SERVICE_BY_ID';
const GET_SERVICE_BY_CATEGORY_ID = 'GET_SERVICE_BY_CATEGORY_ID';

//Get category
export const GetCategoriesAPI = makeFetchAction(GET_CATEGORY, ({}) =>
  nfetch({
    endpoint: `/categories`,
    method: 'GET'
  })()
);
export const getCategories = () =>
  respondToSuccess(GetCategoriesAPI.actionCreator({}), () => {});
export const GetCategoriesDataSelector = GetCategoriesAPI.dataSelector;

// Add new Category
export const AddNewCategoryAPI = makeFetchAction(ADD_NEW_CATEGORY, values =>
  nfetch({
    endpoint: '/category'
  })(values)
);
export const addNewCategory = values =>
  respondToSuccess(
    AddNewCategoryAPI.actionCreator(values),
    (resp, _, store) => {
      store.dispatch(getCategories({}));
    }
  );
export const AddNewCategoryDataSelector = AddNewCategoryAPI.dataSelector;
export const AddNewCategoryErrorSelector = AddNewCategoryAPI.errorSelector;
export const AddNewCategoryResetter = getResetter(AddNewCategoryAPI);

// Delete Category
export const DeleteCategoryAPI = makeFetchAction(DELETE_CATEGORY, ({ id }) =>
  nfetch({
    endpoint: `/category/${id}`,
    method: 'DELETE'
  })()
);
export const deleteCategory = id =>
  respondToSuccess(
    DeleteCategoryAPI.actionCreator({ id }),
    (resp, _, store) => {
      store.dispatch(getCategories({}));
    }
  );
export const DeleteCategoryDataSelector = DeleteCategoryAPI.dataSelector;
export const DeleteCategoryResetter = getResetter(DeleteCategoryAPI);

// Update Category
export const UpdateCategoryAPI = makeFetchAction(UPDATE_CATEGORY, values =>
  nfetch({
    endpoint: `/category/${values.id}`,
    method: 'PUT'
  })(values)
);
export const updateCategory = values =>
  respondToSuccess(
    UpdateCategoryAPI.actionCreator(values),
    (resp, _, store) => {
      store.dispatch(getCategories({}));
    }
  );
export const UpdateCategoryDataSelector = UpdateCategoryAPI.dataSelector;
export const UpdateCategoryResetter = getResetter(UpdateCategoryAPI);

// Get Service by Category Id
export const GetServiceByCategoryIdAPI = makeFetchAction(
  GET_CATEGORY_BY_ID,
  ({ id }) =>
    nfetch({
      endpoint: `/serviceByCategoryId/${id}`,
      method: 'GET'
    })()
);
export const getServiceByCategoryId = id =>
  respondToSuccess(GetServiceByCategoryIdAPI.actionCreator({ id }), () => {});
export const GetServiceByCategoryIdDataSelector =
  GetServiceByCategoryIdAPI.dataSelector;
export const GetServiceByCategoryIdResetter = getResetter(
  GetServiceByCategoryIdAPI
);

// Get Category by id
export const GetCategoryByIdAPI = makeFetchAction(
  GET_CATEGORY_BY_ID,
  ({ id }) =>
    nfetch({
      endpoint: `/category/${id}`,
      method: 'GET'
    })()
);
export const getCategoryById = id =>
  respondToSuccess(GetCategoryByIdAPI.actionCreator({ id }), () => {});
export const GetCategoryByIdDataSelector = GetCategoryByIdAPI.dataSelector;
export const GetCategoryByIdResetter = getResetter(GetCategoryByIdAPI);

// Get service
export const GetServicesAPI = makeFetchAction(
  GET_SERVICE,
  ({ page, pageSize }) =>
    nfetch({
      endpoint: `/getAllService?page=${page}&size=${pageSize}`,
      method: 'GET'
    })()
);
export const getServices = ({ page, pageSize }) =>
  respondToSuccess(GetServicesAPI.actionCreator({ page, pageSize }), () => {});
export const GetServicesDataSelector = GetServicesAPI.dataSelector;

// Add new Service
export const AddNewServiceAPI = makeFetchAction(ADD_NEW_SERVICE, values =>
  nfetch({
    endpoint: '/service'
  })(values)
);
export const addNewService = values =>
  respondToSuccess(AddNewServiceAPI.actionCreator(values), (resp, _, store) => {
    store.dispatch(
      getServiceByCategoryId(localStorage.getItem('_category_id_with_service'))
    );
  });
export const AddNewServiceDataSelector = AddNewServiceAPI.dataSelector;
export const AddNewServiceErrorSelector = AddNewServiceAPI.errorSelector;
export const AddNewServiceResetter = getResetter(AddNewServiceAPI);

// Update service
export const UpdateServiceAPI = makeFetchAction(UPDATE_SERVICE, values =>
  nfetch({
    endpoint: `/service/${values.id}`,
    method: 'PUT'
  })(values)
);
export const updateService = values =>
  respondToSuccess(UpdateServiceAPI.actionCreator(values), (resp, _, store) => {
    store.dispatch(
      getServiceByCategoryId(localStorage.getItem('_category_id_with_service'))
    );
  });
export const UpdateServiceDataSelector = UpdateServiceAPI.dataSelector;
export const UpdateServiceResetter = getResetter(UpdateServiceAPI);

// Get service by id
export const GetServiceByIdAPI = makeFetchAction(GET_SERVICE_BY_ID, ({ id }) =>
  nfetch({
    endpoint: `/service/${id}`,
    method: 'GET'
  })()
);
export const getServiceById = id =>
  respondToSuccess(GetServiceByIdAPI.actionCreator({ id }), () => {});
export const GetServiceByIdDataSelector = GetServiceByIdAPI.dataSelector;
export const GetServiceByIdResetter = getResetter(GetServiceByIdAPI);
