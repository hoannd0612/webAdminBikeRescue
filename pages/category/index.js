import React from 'react';

import PageLayout from '../../layouts/PageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';
import CategoryManagementComponent from '../../components/CategoryManagementComponent';

const ManagePage = rootProps => (
  <PageLayout {...rootProps} title="Category Management">
    <CategoryManagementComponent />
  </PageLayout>
);

export default AuthenHOC(ManagePage);
