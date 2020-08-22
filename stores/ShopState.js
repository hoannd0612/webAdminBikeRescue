import { makeFetchAction } from 'redux-api-call';
import { get, flow } from 'lodash/fp';

import { respondToSuccess } from '../stores/middlewares/api-reaction';
import { createErrorSelector } from '../utils';
import nfetch from '../libs/nfetch';
import { getResetter } from '../libs';

const GET_SHOP = 'GET_SHOP';
export const ADD_NEW_SHOP = 'ADD_NEW_SHOP';
export const DELETE_SHOP = 'DELETE_SHOP';
export const UPDATE_SHOP = 'UPDATE_SHOP';
export const GET_SHOP_BY_ID = 'GET_SHOP_BY_ID';

const GET_SHOP_OWNER = 'GET_SHOP_OWNER';
export const ADD_NEW_SHOP_OWNER = 'ADD_NEW_SHOP_OWNER';
export const DELETE_SHOP_OWNER = 'DELETE_SHOP_OWNER';
export const UPDATE_SHOP_OWNER = 'UPDATE_SHOP_OWNER';
export const GET_SHOP_OWNER_BY_ID = 'GET_SHOP_OWNER_BY_ID';
export const GET_SHOP_BY_SHOP_OWNER_ID = 'GET_SHOP_BY_SHOP_OWNER_ID';

// Service
const GET_SERVICE = 'GET_SERVICE';
const GET_DISTRICT = 'GET_DISTRICT';
export const ADD_NEW_SERVICE = 'ADD_NEW_SERVICE';
export const UPDATE_SERVICE = 'UPDATE_SERVICE';
export const GET_SERVICE_BY_ID = 'GET_SERVICE_BY_ID';
export const GET_SERVICES_BY_SHOP_ID = 'GET_SERVICES_BY_SHOP_ID';

//Get shop
export const GetShopOwnersAPI = makeFetchAction(
  GET_SHOP_OWNER,
  ({ page, pageSize }) =>
    nfetch({
      endpoint: `/admin/shopOwner/page?page=${page}&size=${pageSize}`,
      method: 'GET'
    })()
);
export const getShopOwners = ({ page, pageSize }) =>
  respondToSuccess(
    GetShopOwnersAPI.actionCreator({ page, pageSize }),
    () => {}
  );
export const GetShopOwnersDataSelector = GetShopOwnersAPI.dataSelector;

// Add new Shop
export const AddNewShopOwnerAPI = makeFetchAction(
  ADD_NEW_SHOP_OWNER,
  values => {
    return nfetch({
      endpoint: '/api/users/registerShopOwner'
    })(values);
  }
);
export const addNewShopOwner = values =>
  respondToSuccess(
    AddNewShopOwnerAPI.actionCreator(values),
    (resp, _, store) => {
      store.dispatch(getShopOwners({ page: 0, pageSize: 10 }));
    }
  );
export const AddNewShopOwnerDataSelector = AddNewShopOwnerAPI.dataSelector;
export const AddNewShopOwnerErrorSelector = AddNewShopOwnerAPI.errorSelector;
export const AddNewShopOwnerResetter = getResetter(AddNewShopOwnerAPI);

// Delete Shop
export const DeleteShopOwnerAPI = makeFetchAction(DELETE_SHOP_OWNER, ({ id }) =>
  nfetch({
    endpoint: `/shop/${id}`,
    method: 'DELETE'
  })()
);
export const deleteShopOwner = id =>
  respondToSuccess(
    DeleteShopOwnerAPI.actionCreator({ id }),
    (resp, _, store) => {
      store.dispatch(getShopOwners({}));
    }
  );
export const DeleteShopOwnerDataSelector = DeleteShopOwnerAPI.dataSelector;
export const DeleteShopOwnerResetter = getResetter(DeleteShopOwnerAPI);

// Update Shop
export const UpdateShopOwnerAPI = makeFetchAction(UPDATE_SHOP_OWNER, values =>
  nfetch({
    endpoint: `/api/updateShopOwner/${values.id}`,
    method: 'PUT'
  })(values)
);
export const updateShopOwner = values => {
  return respondToSuccess(
    UpdateShopOwnerAPI.actionCreator({
      ...values,
      status: values.status === true ? 4 : 0
    }),
    (resp, _, store) => {
      store.dispatch(getShopOwners({ page: 0, pageSize: 10 }));
    }
  );
};
export const UpdateShopOwnerDataSelector = UpdateShopOwnerAPI.dataSelector;
export const UpdateShopOwnerResetter = getResetter(UpdateShopOwnerAPI);

// Get Shop by id
export const GetShopOwnerByIdAPI = makeFetchAction(
  GET_SHOP_OWNER_BY_ID,
  ({ id }) =>
    nfetch({
      endpoint: `/admin/users/${id}`,
      method: 'GET'
    })()
);
export const getShopOwnerById = id =>
  respondToSuccess(GetShopOwnerByIdAPI.actionCreator({ id }), () => {});
export const GetShopOwnerByIdDataSelector = GetShopOwnerByIdAPI.dataSelector;
export const GetShopOwnerByIdResetter = getResetter(GetShopOwnerByIdAPI);

// Get Shop by Shop Owner id
export const GetShopByShopOwnerIdAPI = makeFetchAction(
  GET_SHOP_BY_SHOP_OWNER_ID,
  ({ id, page, pageSize }) =>
    nfetch({
      endpoint: `/shop/shops/filter?id=${id}&page=${page}&size=${pageSize}`,
      method: 'GET'
    })()
);
export const getShopByShopOwnerId = ({ id, page, pageSize }) =>
  respondToSuccess(
    GetShopByShopOwnerIdAPI.actionCreator({ id, page, pageSize }),
    () => {}
  );
export const GetShopByShopOwnerIdDataSelector =
  GetShopByShopOwnerIdAPI.dataSelector;
export const GetShopByShopOwnerIdResetter = getResetter(
  GetShopByShopOwnerIdAPI
);

//Get shop
export const GetShopsAPI = makeFetchAction(GET_SHOP, ({ page, pageSize }) =>
  nfetch({
    endpoint: `/shop/getAllShopPaging?page=${page}&size=${pageSize}`,
    method: 'GET'
  })()
);
export const getShops = ({ page, pageSize }) =>
  respondToSuccess(GetShopsAPI.actionCreator({ page, pageSize }), () => {});
export const GetShopsDataSelector = GetShopsAPI.dataSelector;

// Add new Shop
export const AddNewShopAPI = makeFetchAction(ADD_NEW_SHOP, values => {
  return nfetch({
    endpoint: '/shop/createNewShop'
  })(values);
});
export const addNewShop = values =>
  respondToSuccess(AddNewShopAPI.actionCreator(values), (resp, _, store) => {
    store.dispatch(getShops({ page: 0, pageSize: 10 }));
  });
export const AddNewShopDataSelector = AddNewShopAPI.dataSelector;
export const AddNewShopErrorSelector = AddNewShopAPI.errorSelector;
export const AddNewShopResetter = getResetter(AddNewShopAPI);

// Delete Shop
export const DeleteShopAPI = makeFetchAction(DELETE_SHOP, ({ id }) =>
  nfetch({
    endpoint: `/shop/${id}`,
    method: 'DELETE'
  })()
);
export const deleteShop = id =>
  respondToSuccess(DeleteShopAPI.actionCreator({ id }), (resp, _, store) => {
    store.dispatch(getShops({}));
  });
export const DeleteShopDataSelector = DeleteShopAPI.dataSelector;
export const DeleteShopResetter = getResetter(DeleteShopAPI);

// Update Shop
export const UpdateShopAPI = makeFetchAction(UPDATE_SHOP, values =>
  nfetch({
    endpoint: `/shop/updateShop/${values.id}`,
    method: 'PUT'
  })(values)
);
export const updateShop = values =>
  respondToSuccess(UpdateShopAPI.actionCreator(values), (resp, _, store) => {
    store.dispatch(getShops({ page: 0, pageSize: 10 }));
  });
export const UpdateShopDataSelector = UpdateShopAPI.dataSelector;
export const UpdateShopResetter = getResetter(UpdateShopAPI);

// Get Shop by id
export const GetShopByIdAPI = makeFetchAction(GET_SHOP_BY_ID, ({ id }) =>
  nfetch({
    endpoint: `/shop/getShopById/${id}`,
    method: 'GET'
  })()
);
export const getShopById = id =>
  respondToSuccess(GetShopByIdAPI.actionCreator({ id }), () => {});
export const GetShopByIdDataSelector = GetShopByIdAPI.dataSelector;
export const GetShopByIdResetter = getResetter(GetShopByIdAPI);

//Get service
// export const GetServicesAPI = makeFetchAction(GET_SERVICE, ({}) =>
//   nfetch({
//     endpoint: `/services`,
//     method: 'GET'
//   })()
// );
// export const getServices = ({}) =>
//   respondToSuccess(GetServicesAPI.actionCreator({}), () => {});
// export const GetServicesDataSelector = GetServicesAPI.dataSelector;

// Add new Shop
export const AddNewServiceAPI = makeFetchAction(ADD_NEW_SERVICE, values =>
  nfetch({
    endpoint: '/service'
  })(values)
);
export const addNewService = values =>
  respondToSuccess(AddNewServiceAPI.actionCreator(values), (resp, _, store) => {
    // store.dispatch(getShops({}));
  });
export const AddNewServiceDataSelector = AddNewServiceAPI.dataSelector;
export const AddNewServiceErrorSelector = AddNewServiceAPI.errorSelector;
export const AddNewServiceResetter = getResetter(AddNewServiceAPI);

// Delete Shop
// export const DeleteShopAPI = makeFetchAction(DELETE_SHOP, ({ id }) =>
//   nfetch({
//     endpoint: `/shop/${id}`,
//     method: 'DELETE'
//   })()
// );
// export const deleteShop = id =>
//   respondToSuccess(
//     DeleteShopAPI.actionCreator({ id }),
//     (resp, _, store) => {
//       store.dispatch(getShops({}));
//     }
//   );
// export const DeleteShopDataSelector = DeleteShopAPI.dataSelector;
// export const DeleteShopResetter = getResetter(DeleteShopAPI);

// Update service
export const UpdateServiceAPI = makeFetchAction(UPDATE_SERVICE, values =>
  nfetch({
    endpoint: `/service/${values.id}`,
    method: 'PUT'
  })(values)
);
export const updateService = values =>
  respondToSuccess(UpdateServiceAPI.actionCreator(values), (resp, _, store) => {
    // store.dispatch(getShops({}));
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

// Get service by shop id
export const GetServicesByShopIdAPI = makeFetchAction(
  GET_SERVICES_BY_SHOP_ID,
  ({ shopId, page = 0, pageSize = 10 }) =>
    nfetch({
      endpoint: `/shop/getShopServiceByShopId?shopId=${shopId}&page=${page}&size=${pageSize}`,
      method: 'GET'
    })()
);
export const getServicesByShopId = ({ shopId, page, pageSize }) =>
  respondToSuccess(
    GetServicesByShopIdAPI.actionCreator({ shopId, page, pageSize }),
    () => {}
  );
export const GetServicesByShopIdDataSelector =
  GetServicesByShopIdAPI.dataSelector;
export const GetServicesByShopIdResetter = getResetter(GetServicesByShopIdAPI);

//Get District
export const GetDistrictsAPI = makeFetchAction(GET_DISTRICT, () =>
  nfetch({
    endpoint: `/getAllDistrict`,
    method: 'GET'
  })()
);
export const getDistricts = () =>
  respondToSuccess(GetDistrictsAPI.actionCreator(), () => {});
export const GetDistrictsDataSelector = GetDistrictsAPI.dataSelector;
