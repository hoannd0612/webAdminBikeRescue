import React from 'react';

import PageLayout from '../../layouts/PageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';
import ShopDetailsComponent from '../../components/ShopDetailsComponent';

const DetailsPage = rootProps => (
  <PageLayout {...rootProps} title="Shop Details">
    <ShopDetailsComponent />
  </PageLayout>
);

export default AuthenHOC(DetailsPage);
