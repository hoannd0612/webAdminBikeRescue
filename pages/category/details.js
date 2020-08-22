import React from 'react';

import PageLayout from '../../layouts/PageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';
import CategoryDetailsComponent from '../../components/CategoryDetailsComponent';

const DetailsPage = rootProps => (
  <PageLayout {...rootProps} title="Category Details">
    <CategoryDetailsComponent />
  </PageLayout>
);

export default AuthenHOC(DetailsPage);
