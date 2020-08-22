import React from 'react';

import PageLayout from '../../layouts/PageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';
import ShopActionsComponent from '../../components/ShopActionsComponent';

const AddingPage = rootProps => (
  <PageLayout {...rootProps} title="Shop Adding">
    <ShopActionsComponent />
  </PageLayout>
);

export default AuthenHOC(AddingPage);
