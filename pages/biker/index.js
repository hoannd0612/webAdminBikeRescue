import React from 'react';

import PageLayout from '../../layouts/PageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';
import UserManagementComponent from '../../components/UserManagementComponent';

const ManagePage = rootProps => (
  <PageLayout {...rootProps} title="User Management">
    <UserManagementComponent />
  </PageLayout>
);

export default AuthenHOC(ManagePage);
