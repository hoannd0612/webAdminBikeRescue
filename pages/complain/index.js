import React from 'react';

import PageLayout from '../../layouts/PageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';
import ComplainManagementComponent from '../../components/ComplainManagementComponent';

const ManagePage = rootProps => (
  <PageLayout {...rootProps} title="Complain Management">
    <ComplainManagementComponent />
  </PageLayout>
);

export default AuthenHOC(ManagePage);
