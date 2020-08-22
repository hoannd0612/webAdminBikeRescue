import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import React, { useEffect } from 'react';

import {
  getServicesByShopId,
  GetServicesByShopIdDataSelector
} from '../stores/ShopState';

const connectToRedux = connect(
  createStructuredSelector({ data: GetServicesByShopIdDataSelector }),
  dispatch => ({
    getShopServices: ({ id, page, pageSize }) =>
      dispatch(getServicesByShopId({ id, page, pageSize }))
  })
);
const ShopServicesComponent = ({ shopId, getShopServices, data }) => {
  useEffect(() => {
    getShopServices(shopId);
  }, [getShopServices, shopId]);
  return (
    <Grid container spacing={3}>
      {!data.length
        ? 'This shop do not have any Service'
        : data.map((wallet, index) => (
            <Grid style={{ flexGrow: 1 }} key={index} item sm={6} md={6} lg={4}>
              <DisplayWalletDetailsCardComponent ewallet={wallet} key={index} />
            </Grid>
          ))}
    </Grid>
  );
};

export default connectToRedux(ShopServicesComponent);
