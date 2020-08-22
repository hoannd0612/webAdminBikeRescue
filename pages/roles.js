import React from 'react';

import PageLayout from '../layouts/PageLayout';
import AuthenHOC from '../components/HOC/AuthenHOC';
import RoleManagementComponent from '../components/RoleManagementComponent';

const ManagePage = rootProps => (
  <PageLayout {...rootProps} title="Role Management">
    <RoleManagementComponent />
  </PageLayout>
);

export default AuthenHOC(ManagePage);
