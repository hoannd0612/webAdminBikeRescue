import React from 'react';

import PageLayout from '../../layouts/PageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';
import RequestManagementComponent from '../../components/RequestManagementComponent';

const ManagePage = rootProps => (
  <PageLayout {...rootProps} title="Request Management">
    <RequestManagementComponent />
  </PageLayout>
);

export default AuthenHOC(ManagePage);
