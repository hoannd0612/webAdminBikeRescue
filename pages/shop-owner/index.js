import React from 'react';

import PageLayout from '../../layouts/PageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';
import ShopManagementComponent from '../../components/ShopManagementComponent';

const ManagePage = rootProps => (
  <PageLayout {...rootProps} title="Shop Management">
    <ShopManagementComponent />
  </PageLayout>
);

export default AuthenHOC(ManagePage);
