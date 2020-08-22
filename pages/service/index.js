import React from 'react';

import PageLayout from '../../layouts/PageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';
import ServiceManagementComponent from '../../components/ServiceManagementComponent';

const ServicePage = rootProps => (
  <PageLayout {...rootProps} title="Service Management">
    <ServiceManagementComponent />
  </PageLayout>
);

export default AuthenHOC(ServicePage);
